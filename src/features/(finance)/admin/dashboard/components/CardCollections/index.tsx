import { useState } from "react";
import CardItem from "./CardItem";
import { formatCurrency } from "@/features/(finance)/commons/utils/functions/formatCurrency";
import { FaHashtag, FaRegBookmark } from "react-icons/fa6";

const dummy = [
  {
    title: "Total Amout",
    value: 65000000,
    additionalInfo: "This month",
    icon: <FaRegBookmark />,
  },
  {
    title: "This Month",
    value: 650000,
    icon: <FaHashtag />,
  },
  {
    title: "Most Category",
    value: 150000,
    icon: <FaHashtag />,
    additionalInfo: "Kebutuhan",
  },
];

const CardCollections = () => {
  const [data, _] = useState(dummy);

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      {data.map((el) => (
        <CardItem
          title={el.title}
          value={formatCurrency(el.value)}
          additionalInfo={el.additionalInfo}
          icon={el.icon}
          key={el.title}
        />
      ))}
    </div>
  );
};

export default CardCollections;
