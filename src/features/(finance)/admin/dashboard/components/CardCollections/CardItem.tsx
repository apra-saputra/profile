import {
  Card,
  CardContent,
  CardFooter,
} from "@/features/commons/components/ui/card";
import { Skeleton } from "@/features/commons/components/ui/skeleton";
import { FC, memo, ReactNode } from "react";

interface CardItemProps {
  title: string;
  value: string;
  additionalInfo?: string;
  icon: ReactNode;
  isLoading: boolean;
}

const CardItem: FC<CardItemProps> = memo(
  ({ title, value, additionalInfo, icon, isLoading }) => {
    if (isLoading) {
      return (
        <Card className="bg-secondary/80 min-h-[140px] min-w-[250px]">
          <CardContent className="flex flex-col p-4 justify-between h-full w-full">
            <Skeleton className=" w-full h-8" />
            <div className="w-full flex justify-between gap-2">
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
            </div>
            <Skeleton className=" w-1/4 h-8" />
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="bg-secondary/80 min-h-[140px] min-w-[250px]">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-x-6">
            {icon}
            <div className="flex-1 text-end">
              <h4>{title}</h4>
              <h3>{value}</h3>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-gray-400">
            {additionalInfo ? additionalInfo : ""}
          </p>
        </CardFooter>
      </Card>
    );
  }
);

export default CardItem;
