import { PrismaClient } from "@prisma/client";
import { subDays, subHours, startOfMonth, setDate } from "date-fns";

const prisma = new PrismaClient();

const DEMO_CLERK_ID = "demo_user_001";

const DEFAULT_CATEGORIES = [
  { name: "Bills", icon: "receipt", color: "#8E8E93" },
  { name: "Food", icon: "restaurant", color: "#007AFF" },
  { name: "Shopping", icon: "bag", color: "#FF69B4" },
  { name: "Vacation", icon: "airplane", color: "#FF9500" },
  { name: "Medicine", icon: "medical", color: "#007AFF" },
  { name: "Transport", icon: "car", color: "#34C759" },
  { name: "Fun", icon: "film", color: "#dedc52" },
  { name: "School", icon: "school", color: "#FF3B30" },
];

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.transaction.deleteMany();
  await prisma.recurringSchedule.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.category.deleteMany();
  await prisma.accountMember.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // Create demo user
  const user = await prisma.user.create({
    data: {
      clerkId: DEMO_CLERK_ID,
      email: "demo@spendy.app",
      name: "Demo User",
    },
  });

  // Create accounts
  const accountNames = [
    "Personal Account",
    "Business Account",
    "Investment Account",
  ];

  const accounts = [];
  for (const name of accountNames) {
    const account = await prisma.account.create({
      data: {
        name,
        members: {
          create: { userId: user.id, role: "OWNER" },
        },
      },
    });
    accounts.push(account);
  }

  const personalAccount = accounts[0];

  // Create categories for personal account
  const categories = await Promise.all(
    DEFAULT_CATEGORIES.map((category) =>
      prisma.category.create({
        data: { ...category, accountId: personalAccount.id },
      }),
    ),
  );

  const catMap = new Map(categories.map((c) => [c.name, c]));

  // Create transactions matching the mock data
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 30);
  const yesterday = subDays(
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 15),
    1,
  );

  const transactions = [
    {
      description: "Coffee Shop",
      amount: -450, // -$4.50
      date: today,
      categoryId: catMap.get("Food")!.id,
    },
    {
      description: "Gas Station",
      amount: -4500, // -$45.00
      date: yesterday,
      categoryId: catMap.get("Transport")!.id,
    },
    {
      description: "Grocery Store",
      amount: -8750, // -$87.50
      date: subDays(now, 2),
      categoryId: catMap.get("Food")!.id,
    },
    {
      description: "Movie Tickets",
      amount: -2400, // -$24.00
      date: subDays(now, 3),
      categoryId: catMap.get("Fun")!.id,
    },
    {
      description: "Pharmacy",
      amount: -3200, // -$32.00
      date: subDays(now, 4),
      categoryId: catMap.get("Medicine")!.id,
    },
    {
      description: "Online Shopping",
      amount: -12900, // -$129.00
      date: subDays(now, 5),
      categoryId: catMap.get("Shopping")!.id,
    },
    {
      description: "Textbooks",
      amount: -8500, // -$85.00
      date: subDays(now, 6),
      categoryId: catMap.get("School")!.id,
    },
    {
      description: "Electricity Bill",
      amount: -15500, // -$155.00
      date: subDays(now, 7),
      categoryId: catMap.get("Bills")!.id,
    },
  ];

  for (const tx of transactions) {
    await prisma.transaction.create({
      data: {
        ...tx,
        accountId: personalAccount.id,
        type: "ONE_TIME",
      },
    });
  }

  // Add some older transactions for monthly average calculation
  for (let monthsAgo = 1; monthsAgo <= 6; monthsAgo++) {
    const monthDate = subDays(now, monthsAgo * 30);
    await prisma.transaction.create({
      data: {
        accountId: personalAccount.id,
        categoryId: catMap.get("Food")!.id,
        amount: -65000 - Math.floor(Math.random() * 20000), // ~$650-850
        description: `Monthly food expenses`,
        date: monthDate,
        type: "ONE_TIME",
      },
    });
    await prisma.transaction.create({
      data: {
        accountId: personalAccount.id,
        categoryId: catMap.get("Transport")!.id,
        amount: -42000 - Math.floor(Math.random() * 10000),
        description: `Monthly transport`,
        date: monthDate,
        type: "ONE_TIME",
      },
    });
    await prisma.transaction.create({
      data: {
        accountId: personalAccount.id,
        categoryId: catMap.get("Shopping")!.id,
        amount: -38000 - Math.floor(Math.random() * 15000),
        description: `Monthly shopping`,
        date: monthDate,
        type: "ONE_TIME",
      },
    });
  }

  // Create recurring schedules (upcoming bills)
  const schedules = [
    {
      description: "Rent",
      amount: -120000, // -$1,200.00
      frequency: "MONTHLY" as const,
      dayOfMonth: 1,
      icon: "home",
      color: "#FF3B30",
      categoryId: catMap.get("Bills")!.id,
    },
    {
      description: "Netflix",
      amount: -1599, // -$15.99
      frequency: "MONTHLY" as const,
      dayOfMonth: 5,
      icon: "logo-youtube",
      color: "#E50914",
      categoryId: catMap.get("Fun")!.id,
    },
    {
      description: "Gym",
      amount: -4999, // -$49.99
      frequency: "MONTHLY" as const,
      dayOfMonth: 10,
      icon: "barbell",
      color: "#34C759",
      categoryId: catMap.get("Medicine")!.id,
    },
    {
      description: "Internet",
      amount: -5999, // -$59.99
      frequency: "MONTHLY" as const,
      dayOfMonth: 15,
      icon: "wifi",
      color: "#007AFF",
      categoryId: catMap.get("Bills")!.id,
    },
  ];

  for (const schedule of schedules) {
    await prisma.recurringSchedule.create({
      data: {
        ...schedule,
        accountId: personalAccount.id,
        isActive: true,
      },
    });
  }

  // Create budget for current month
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  await prisma.budget.create({
    data: {
      accountId: personalAccount.id,
      categoryId: null,
      amount: 334000, // $3,340.00 - matching the mock data
      month: currentMonth,
      year: currentYear,
    },
  });

  console.log("Seed complete!");
  console.log(`  User: ${user.email} (clerkId: ${user.clerkId})`);
  console.log(`  Accounts: ${accounts.length}`);
  console.log(`  Categories: ${categories.length}`);
  console.log(`  Transactions: ${transactions.length + 18} (current + historical)`);
  console.log(`  Recurring schedules: ${schedules.length}`);
  console.log(`  Budgets: 1`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
