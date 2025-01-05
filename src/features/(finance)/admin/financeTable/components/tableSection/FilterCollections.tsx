import { DatePickerWithRange } from "@/features/(finance)/commons/components/DatePicker";
import SelectComponent, {
  OptionSelect,
} from "@/features/(finance)/commons/components/SelectComponent";
import useFetchData from "@/features/(finance)/commons/hooks/useFetchData";
import { fetchCategories } from "@/features/(finance)/commons/services/category";
import { Button } from "@/features/commons/components/ui/button";
import { Label } from "@/features/commons/components/ui/label";
import { Skeleton } from "@/features/commons/components/ui/skeleton";
import { RotateCcw } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { DateRange } from "react-day-picker";

interface FilterCollectionsProps {
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

const FilterCollections = ({
  date,
  setDate,
  category,
  setCategory,
}: FilterCollectionsProps) => {
  const [option, setoption] = useState<OptionSelect[]>([]);
  const { isLoading } = useFetchData({
    data: option,
    setData: setoption,
    fetch: async () => {
      const payload = await fetchCategories();

      return payload.map((category) => ({
        name: category.name,
        value: category.id,
      }));
    },
  });

  const onReset = () => {
    setDate(undefined)
    setCategory('')
  }

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2 md:gap-4 flex-wrap">
        <div>
          <Label className="px-2">filter Tanggal</Label>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>
        <div>
          <Label className="px-2">filter Kategory</Label>
          {isLoading ? (
            <Skeleton className="w-40 h-12" />
          ) : (
            <SelectComponent
              options={option}
              state={category}
              setState={setCategory}
              className="min-w-40"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        {
          (!!date?.from || !!category) && (
            <>
            <Label className="px-2">Reset Filter</Label>
            <Button onClick={onReset}>
              <RotateCcw />
              <span>Reset</span>
            </Button>
            </>
          )
        }
      </div>
    </div>
  );
};

export default FilterCollections;
