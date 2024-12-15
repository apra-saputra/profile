import { FinanceLog } from "../../types/financeLog";

export const dummyFinances: FinanceLog[] = [
  {
    id: "1",
    createdAt: new Date("2024-12-01"),
    name: "Transaction A",
    amount: 100,
    category: { id: "cat1", name: "Shopping" },
    typeTransaction: { id: "type1", name: "Debit" },
    desc: "Shopping transaction",
  },
  {
    id: "2",
    createdAt: new Date("2024-12-02"),
    name: "Transaction B",
    amount: 150,
    category: { id: "cat2", name: "Food" },
    typeTransaction: { id: "type2", name: "Credit" },
    desc: "Food transaction",
  },
  {
    id: "3",
    createdAt: new Date("2024-12-03"),
    name: "Transaction C",
    amount: 200,
    category: { id: "cat3", name: "Travel" },
    typeTransaction: { id: "type1", name: "Debit" },
    desc: "Travel transaction",
  },
  {
    id: "4",
    createdAt: new Date("2024-12-04"),
    name: "Transaction D",
    amount: 250,
    category: { id: "cat4", name: "Bills" },
    typeTransaction: { id: "type2", name: "Credit" },
    desc: "Bills payment",
  },
  {
    id: "5",
    createdAt: new Date("2024-12-05"),
    name: "Transaction E",
    amount: 300,
    category: { id: "cat5", name: "Entertainment" },
    typeTransaction: { id: "type1", name: "Debit" },
    desc: "Entertainment expense",
  },
  {
    id: "6",
    createdAt: new Date("2024-12-06"),
    name: "Transaction F",
    amount: 350,
    category: { id: "cat1", name: "Shopping" },
    typeTransaction: { id: "type2", name: "Credit" },
    desc: "Shopping transaction",
  },
  {
    id: "7",
    createdAt: new Date("2024-12-07"),
    name: "Transaction G",
    amount: 400,
    category: { id: "cat6", name: "Health" },
    typeTransaction: { id: "type1", name: "Debit" },
    desc: "Health-related expense",
  },
  {
    id: "8",
    createdAt: new Date("2024-12-08"),
    name: "Transaction H",
    amount: 450,
    category: { id: "cat2", name: "Food" },
    typeTransaction: { id: "type2", name: "Credit" },
    desc: "Food transaction",
  },
  {
    id: "9",
    createdAt: new Date("2024-12-09"),
    name: "Transaction I",
    amount: 500,
    category: { id: "cat4", name: "Bills" },
    typeTransaction: { id: "type1", name: "Debit" },
    desc: "Bills payment",
  },
  {
    id: "10",
    createdAt: new Date("2024-12-10"),
    name: "Transaction J",
    amount: 550,
    category: { id: "cat3", name: "Travel" },
    typeTransaction: { id: "type2", name: "Credit" },
    desc: "Travel transaction",
  },
];
