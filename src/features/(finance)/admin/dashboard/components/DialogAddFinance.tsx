import SelectComponent from "@/features/(finance)/commons/components/SelectComponent";
import { useGetCategories } from "@/features/(finance)/commons/hooks/useGetCategories";
import { useGetTypeTransactions } from "@/features/(finance)/commons/hooks/useGetTypeTransactions";
import { createFinanceLog } from "@/features/(finance)/commons/services/financeLog";
import { formatCurrencySeparateComa } from "@/features/(finance)/commons/utils/functions/formatCurrencySeparateComa";
import { Button } from "@/features/commons/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/features/commons/components/ui/dialog";
import { Input } from "@/features/commons/components/ui/input";
import { Label } from "@/features/commons/components/ui/label";
import { Separator } from "@/features/commons/components/ui/separator";
import { useToast } from "@/features/commons/hooks/use-toast";
import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";

interface DialogAddFinanceProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const initialForm = {
  name: "",
  description: "",
  amount: "",
  typeRef: "",
};

const DialogAddFinance: FC<DialogAddFinanceProps> = ({ isOpen, setIsOpen }) => {
  const { toast } = useToast();

  const [formData, setFormData] = useState(initialForm);
  const [loadingForm, setLoadingForm] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [typeTransactionValue, setTypeTransactionValue] = useState("");

  // handling categories options
  const {
    categories,
    error: categoryError,
    loading: loadingCategory,
  } = useGetCategories();
  const optionsCategory = useMemo(() => {
    if (!loadingCategory && !categoryError)
      return categories.map((el) => ({ value: el.id, name: el.name }));
    return [];
  }, [loadingCategory, categoryError]);
  // handling categories options End

  // handling Type Transaction options
  const {
    typeTransaction,
    error: errorTransaction,
    loading: loadingTransaction,
  } = useGetTypeTransactions();
  const optionsTransaction = useMemo(() => {
    if (!errorTransaction && !loadingTransaction)
      return typeTransaction.map((el) => ({ value: el.id, name: el.name }));
    return [];
  }, [errorTransaction, loadingTransaction]);
  // handling Type Transaction options End

  const resetState = () => {
    setFormData(initialForm);
    setTypeTransactionValue("");
    setCategoryValue("");
  };

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Your form submission logic here
    setLoadingForm(true);
    try {
      const payload = {
        ...formData,
        categoryRef: categoryValue,
        typeRef: typeTransactionValue,
        amount: +formData.amount.replace(/[^\d]/g, ""),
        createdAt: new Date(),
      };

      await createFinanceLog(payload);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ooppss! Something wrong.",
        description: String(error),
      });
    } finally {
      resetState();

      setLoadingForm(false);
      setIsOpen(false);
    }
  };

  const handleOnReset = (event: React.FormEvent) => {
    event.preventDefault();
    // Your form reset logic here
    resetState();
    console.log("onReset", formData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-4xl">
            Insert Finance
          </DialogTitle>
          <DialogDescription>
            Use this form to add new financial activity data.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <form
          onSubmit={handleOnSubmit}
          onReset={handleOnReset}
          className="w-full space-y-4"
        >
          <div>
            <h4>Name Transaction</h4>
            <div>
              <Label>
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Separator />

          <div>
            <Label>
              Amount <span className="text-destructive">*</span>
            </Label>
            <Input
              required
              type="text"
              name="amount"
              value={formatCurrencySeparateComa(formData.amount)}
              onChange={handleInputChange}
              placeholder="Enter amount"
            />
            <span className="text-foreground/50 text-end">
              number in rupiah
            </span>
          </div>
          <Separator />
          <div>
            <Label>
              Category <span className="text-destructive">*</span>
            </Label>
            <SelectComponent
              options={optionsCategory}
              state={categoryValue}
              setState={setCategoryValue}
              placeholder="Select Categories"
            />
          </div>
          <Separator />
          <div>
            <Label>
              Type Transaction <span className="text-destructive">*</span>
            </Label>
            <SelectComponent
              options={optionsTransaction}
              state={typeTransactionValue}
              setState={setTypeTransactionValue}
              placeholder="Select Transaction"
            />
          </div>
          <Separator />
          <DialogFooter>
            <Button type="reset">Reset</Button>
            <Button type="submit">
              {loadingForm ? "Loading..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddFinance;
