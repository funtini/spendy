import { Request, Response, NextFunction } from "express";
import { Webhook } from "svix";
import { env } from "../config/env.js";
import { prisma } from "../lib/prisma.js";

const DEFAULT_CATEGORIES = [
  { name: "Bills", icon: "receipt", color: "#007AFF" },
  { name: "Food", icon: "restaurant", color: "#8E8E93" },
  { name: "Shopping", icon: "bag", color: "#FF69B4" },
  { name: "Vacation", icon: "airplane", color: "#FF9500" },
  { name: "Medicine", icon: "medical", color: "#007AFF" },
  { name: "Transport", icon: "car", color: "#34C759" },
  { name: "Fun", icon: "film", color: "#AF52DE" },
  { name: "School", icon: "school", color: "#FF3B30" },
];

export const handleWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const wh = new Webhook(env.CLERK_WEBHOOK_SECRET);
    const payload = JSON.stringify(req.body);
    const headers = {
      "svix-id": req.headers["svix-id"] as string,
      "svix-timestamp": req.headers["svix-timestamp"] as string,
      "svix-signature": req.headers["svix-signature"] as string,
    };

    const event = wh.verify(payload, headers) as {
      type: string;
      data: {
        id: string;
        email_addresses: { email_address: string }[];
        first_name?: string;
        last_name?: string;
        image_url?: string;
      };
    };

    if (event.type === "user.created") {
      const { id: clerkId, email_addresses, first_name, last_name, image_url } =
        event.data;
      const email = email_addresses[0]?.email_address;
      const name = [first_name, last_name].filter(Boolean).join(" ") || null;

      const user = await prisma.user.create({
        data: {
          clerkId,
          email,
          name,
          imageUrl: image_url,
        },
      });

      // Create default personal account
      const account = await prisma.account.create({
        data: {
          name: "Personal Account",
          members: {
            create: { userId: user.id, role: "OWNER" },
          },
        },
      });

      // Create default categories
      await prisma.category.createMany({
        data: DEFAULT_CATEGORIES.map((c) => ({
          ...c,
          accountId: account.id,
        })),
      });
    }

    if (event.type === "user.updated") {
      const { id: clerkId, email_addresses, first_name, last_name, image_url } =
        event.data;
      const email = email_addresses[0]?.email_address;
      const name = [first_name, last_name].filter(Boolean).join(" ") || null;

      await prisma.user.update({
        where: { clerkId },
        data: { email, name, imageUrl: image_url },
      });
    }

    if (event.type === "user.deleted") {
      const { id: clerkId } = event.data;
      await prisma.user.delete({ where: { clerkId } }).catch(() => {
        // User may not exist
      });
    }

    res.json({ received: true });
  } catch (error) {
    next(error);
  }
};
