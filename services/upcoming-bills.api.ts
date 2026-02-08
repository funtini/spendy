import { api } from "./api";
import type { UpcomingBillsResponse } from "@shared/types/index";

export const getUpcomingBills = (accountId: string) =>
  api<UpcomingBillsResponse>("/upcoming-bills", { params: { accountId } });
