// DTOs shared between frontend and backend

export interface TransactionDto {
  id: string;
  accountId: string;
  categoryId: string;
  amount: number; // cents
  description: string;
  date: string; // ISO string
  type: "ONE_TIME" | "RECURRING";
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
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
  role: "OWNER" | "EDITOR" | "VIEWER";
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
  frequency: "WEEKLY" | "BIWEEKLY" | "MONTHLY" | "YEARLY";
}

export interface UpcomingBillsResponse {
  data: UpcomingBillDto[];
  total: number; // cents
}
