import { Timestamp } from "firebase/firestore";
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

export type TypeTransaction = {
  id: string;
  name: string;
};
