// DTOs shared between frontend and backend

// ─── Enums ───────────────────────────────────────────────────────────────────

export const TransactionType = {
  ONE_TIME: "ONE_TIME",
  RECURRING: "RECURRING",
} as const;
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];

export const AccountRole = {
  OWNER: "OWNER",
  EDITOR: "EDITOR",
  VIEWER: "VIEWER",
} as const;
export type AccountRole = (typeof AccountRole)[keyof typeof AccountRole];

export const RecurringFrequency = {
  WEEKLY: "WEEKLY",
  BIWEEKLY: "BIWEEKLY",
  MONTHLY: "MONTHLY",
  YEARLY: "YEARLY",
} as const;
export type RecurringFrequency = (typeof RecurringFrequency)[keyof typeof RecurringFrequency];

// ─── DTOs ─────────────────────────────────────────────────────────────────────

export interface TransactionDto {
  id: string;
  accountId: string;
  categoryId: string;
  amount: number; // cents
  description: string;
  date: string; // ISO string
  type: TransactionType;
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
  addedByUserId: string | null;
  addedByAlias: string | null; // null = added by current user or unknown
}

export interface TransactionListResponse {
  data: TransactionDto[];
  pagination: PaginationDto;
  summary: {
    totalSpent: number; // cents
    budget: number; // cents
    remaining: number; // cents
  };
}

export interface PaginationDto {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CategoryDto {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CategoryListResponse {
  data: CategoryDto[];
}

export interface AccountDto {
  id: string;
  name: string;
  currency: string;
  role: AccountRole;
  alias: string | null; // current user's alias in this account
}

export interface AccountMemberDto {
  userId: string;
  email: string;
  role: AccountRole;
  alias: string | null;
}

export interface AccountListResponse {
  data: AccountDto[];
}

export interface DashboardResponse {
  currentMonthSpending: number; // cents, positive value representing total spent
  monthlyAverage: number; // cents
}

export interface MonthlyOverviewDto {
  totalSpent: number; // cents
  remaining: number; // cents
  budget: number; // cents
}

export interface SpendingByCategoryDto {
  categoryId: string;
  name: string;
  icon: string;
  color: string;
  amount: number; // cents, positive
  percentage: number; // 0-100
}

export interface WeeklyTrendDto {
  day: string; // e.g. "Monday"
  amount: number; // cents
  percentage: number; // 0-100 (relative to max day)
}

export interface StatisticsResponse {
  monthlyOverview: MonthlyOverviewDto;
  spendingByCategory: SpendingByCategoryDto[];
  weeklyTrend: WeeklyTrendDto[];
}

export interface UpcomingBillDto {
  id: string;
  name: string;
  icon: string;
  color: string;
  amount: number; // cents, positive
  dueDay: number; // 1-31
  frequency: RecurringFrequency;
}

export interface UpcomingBillsResponse {
  data: UpcomingBillDto[];
  total: number; // cents
}

export interface MonthlyTrendDto {
  month: string; // e.g. "Jan"
  year: number;
  amount: number; // cents, positive
}
