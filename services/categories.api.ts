import { api } from "./api";
import type { CategoryListResponse, CategoryDto } from "@shared/types/index";

export const listCategories = (accountId: string) =>
  api<CategoryListResponse>("/categories", { params: { accountId } });

export const createCategory = (data: {
  accountId: string;
  name: string;
  icon: string;
  color: string;
}) => api<CategoryDto>("/categories", { method: "POST", body: data });
