import { api } from "./api";
import type { StatisticsResponse } from "@shared/types/index";

interface StatisticsParams {
  accountId: string;
  month?: number;
  year?: number;
}

export const getStatistics = (params: StatisticsParams) =>
  api<StatisticsResponse>("/statistics", { params });
