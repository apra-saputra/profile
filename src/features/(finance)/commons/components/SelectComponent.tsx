import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/commons/components/ui/select";
import { cn } from "@/libs/utils";
import { Dispatch, FC, memo, SetStateAction } from "react";

export type OptionSelect = {
  name: string;
  value: string;
};

interface SelectComponentProps {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  options: OptionSelect[];
  placeholder?: string;
  className?: string;
}

const SelectComponent: FC<SelectComponentProps> = memo(
  ({ state, options, placeholder, className, setState }) => {
    return (
      <Select value={state} onValueChange={(value) => setState(value)}>
        <SelectTrigger className={cn(className)}>
          <SelectValue placeholder={placeholder || "Select Value"} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem value={option.value} key={option.value}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

export default SelectComponent;
