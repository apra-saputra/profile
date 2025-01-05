import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/features/commons/components/ui/dialog";
import { Separator } from "@/features/commons/components/ui/separator";
import { Label } from "@/features/commons/components/ui/label";
import { useToast } from "@/features/commons/hooks/use-toast";
import { useAuth } from "../../commons/contexts/AuthContext";
import { createFinanceLog } from "../../commons/services/financeLog";
import { Input } from "@/features/commons/components/ui/input";
import { formatSeparateComa } from "../../commons/utils/functions/formatSeparateComa";
import SelectComponent from "../../commons/components/SelectComponent";
import { useGetCategories } from "../../commons/hooks/useGetCategories";
import { useGetTypeTransactions } from "../../commons/hooks/useGetTypeTransactions";
import { Button } from "@/features/commons/components/ui/button";
import { useIsMobile } from "@/features/commons/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/features/commons/components/ui/drawer";

const initialForm = {
  name: "",
  description: "",
  amount: "",
  typeRef: "",
};

export default () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paths = location.pathname.split("/");
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { user } = useAuth();

  const [formData, setFormData] = useState(initialForm);
  const [loadingForm, setLoadingForm] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [typeTransactionValue, setTypeTransactionValue] = useState("");

  const [isOpen, setIsOpen] = useState(
    paths[paths.length - 2] === "transaction" &&
      paths[paths.length - 1] === "create"
  );

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
        userRef: user?.id || "",
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

  useEffect(() => {
    if (!isOpen) navigate(-1);
  }, [isOpen]);

  // render
  const renderInnerForm = () => {
    return (
      <>
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
            value={formatSeparateComa(formData.amount)}
            onChange={handleInputChange}
            placeholder="Enter amount"
          />
          <span className="text-foreground/50 text-end">number in rupiah</span>
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
      </>
    );
  };

  const buttonCollection = () => {
    return (
      <>
        <Button type="reset">Reset</Button>
        <Button type="submit">{loadingForm ? "Loading..." : "Submit"}</Button>
      </>
    );
  };

  // render end

  // render drawer mobile
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. Click save when you're done.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 w-full space-y-4">{renderInnerForm()}</div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>{buttonCollection()}</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

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
          {renderInnerForm()}
          <DialogFooter>{buttonCollection()}</DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
