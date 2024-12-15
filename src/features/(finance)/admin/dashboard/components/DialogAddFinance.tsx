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
import { Dispatch, FC, SetStateAction, useState } from "react";

interface DialogAddFinanceProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const initialForm = {
  name: "",
  description: "",
  amount: "",
  categoryRef: "",
  typeRef: "",
};

const DialogAddFinance: FC<DialogAddFinanceProps> = ({ isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState(initialForm);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Your form submission logic here
    try {
      const payload = {
        ...formData,
        amount: +formData.amount.replace(/[^\d]/g, ""),
        createdAt: new Date(),
      };
      console.log("onSubmit", payload);
    } catch (error) {}
  };

  const handleOnReset = (event: React.FormEvent) => {
    event.preventDefault();
    // Your form reset logic here
    console.log("onReset", formData);
    setFormData(initialForm);
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
            <h4>Name and Description</h4>
            <div>
              <Label>Name</Label>
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
            <Label>Amount</Label>
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
            <Label>Category</Label>
          </div>
          <Separator />
          <div>
            <Label>Type Transaction</Label>
          </div>
          <Separator />
          <DialogFooter>
            <Button type="reset">Reset</Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddFinance;
