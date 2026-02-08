import { api } from "./api";
import type { DashboardResponse } from "@shared/types/index";

export const getDashboard = (accountId: string) =>
  api<DashboardResponse>("/dashboard", { params: { accountId } });
