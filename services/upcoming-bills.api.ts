import { api } from "./api";
import type { UpcomingBillsResponse } from "@shared/types";

export const getUpcomingBills = (accountId: string) =>
  api<UpcomingBillsResponse>("/upcoming-bills", { params: { accountId } });
