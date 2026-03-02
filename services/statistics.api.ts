import { api } from "./api";
import type { StatisticsResponse, MonthlyTrendDto } from "@shared/types";

interface StatisticsParams {
  accountId: string;
  month?: number;
  year?: number;
}

export const getStatistics = (params: StatisticsParams) =>
  api<StatisticsResponse>("/statistics", { params });

export const getMonthlyTrend = (params: { accountId: string; months?: number }) =>
  api<MonthlyTrendDto[]>("/statistics/monthly-trend", { params });
