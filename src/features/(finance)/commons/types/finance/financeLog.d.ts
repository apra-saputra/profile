import { Timestamp } from "firebase/firestore";
import { CategoryCredit } from "./category";

export interface FinanceLog {
  amount: number;
  category: CategoryCredit;
  createdAt: Timestamp;
  desc: string;
  id: string;
  name: string;
  typeTransaction: TypeTransaction;
}

type TypeTransaction = {
  id: string;
  name: string;
};
