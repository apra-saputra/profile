import { FinanceLog } from "./financeLog";

export interface CreateFinance {
  categoryRef: string;
  typeRef: string; // typeTransactionRef
  name: string;
  desc?: string;
  amount: number;
}
