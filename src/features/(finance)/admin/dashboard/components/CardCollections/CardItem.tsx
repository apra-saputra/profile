import {
  Card,
  CardContent,
  CardFooter,
} from "@/features/commons/components/ui/card";
import { FC, ReactNode } from "react";

interface CardItemProps {
  title: string;
  value: string;
  additionalInfo?: string;
  icon: ReactNode;
}

const CardItem: FC<CardItemProps> = ({
  title,
  value,
  additionalInfo,
  icon,
}) => {
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
        <p className="text-gray-400">{additionalInfo ? additionalInfo : ""}</p>
      </CardFooter>
    </Card>
  );
};

export default CardItem;
