import { CategoryCredit } from "./category";

export interface FinanceLog {
  amount: number;
  category: CategoryCredit;
  createdAt: Date;
  desc: string;
  id: string;
  name: string;
  typeTransaction: TypeTransaction;
}

type TypeTransaction = {
  id: string;
  name: string;
};
