import { api } from "./api";
import type { RecurringFrequency } from "@shared/types";

export interface RecurringScheduleDto {
  id: string;
  accountId: string;
  name: string;
  amount: number; // cents
  frequency: RecurringFrequency;
  dueDay: number;
  categoryId: string;
  isActive: boolean;
}

export interface RecurringScheduleListResponse {
  data: RecurringScheduleDto[];
}

export const listRecurringSchedules = (accountId: string) =>
  api<RecurringScheduleListResponse>("/recurring-schedules", { params: { accountId } });

export const createRecurringSchedule = (data: {
  accountId: string;
  name: string;
  amount: number;
  frequency: RecurringFrequency;
  dueDay: number;
  categoryId: string;
}) => api<RecurringScheduleDto>("/recurring-schedules", { method: "POST", body: data });

export const updateRecurringSchedule = (
  id: string,
  data: {
    accountId: string;
    name?: string;
    amount?: number;
    frequency?: RecurringFrequency;
    dueDay?: number;
    categoryId?: string;
    isActive?: boolean;
  },
) => api<RecurringScheduleDto>(`/recurring-schedules/${id}`, { method: "PATCH", body: data });

export const deleteRecurringSchedule = (id: string, accountId: string) =>
  api<void>(`/recurring-schedules/${id}`, { method: "DELETE", params: { accountId } });
