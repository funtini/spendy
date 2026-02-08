import { api } from "./api";
import type { AccountListResponse } from "@shared/types/index";

export const listAccounts = () =>
  api<AccountListResponse>("/accounts");
