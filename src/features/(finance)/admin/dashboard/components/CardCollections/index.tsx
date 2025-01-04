import { ReactNode, useState } from "react";
import CardItem from "./CardItem";
import { formatCurrency } from "@/features/(finance)/commons/utils/functions/formatCurrency";
import { FaHashtag, FaRegBookmark } from "react-icons/fa6";
import { useAuth } from "@/features/(finance)/commons/contexts/AuthContext";
import { fetchBanners } from "@/features/(finance)/commons/services/dashboard";
import useFetchData from "@/features/(finance)/commons/hooks/useFetchData";

type DataBanner = {
  title: string;
  value: number;
  icon: ReactNode;
  additionalInfo?: string;
};

const CardCollections = () => {
  const { user } = useAuth();

  const [data, setData] = useState<DataBanner[]>([]);

  useFetchData({
    data: data,
    setData: setData,
    fetch: async () => {
      const fetchedData = await fetchBanners({ userRef: user?.id || "" }),
        payload: DataBanner[] = [];

      payload.push({
        title: "Total Amout",
        value: fetchedData.totalAmount.value,
        additionalInfo: fetchedData.totalAmount.text || "This month",
        icon: <FaRegBookmark />,
      });
      payload.push({
        title: "Most Expense Category",
        value: fetchedData.mostCategory.value,
        additionalInfo: fetchedData.mostCategory.text || "This month",
        icon: <FaHashtag />,
      });
      payload.push({
        title: "Lowest Expense Category",
        value: fetchedData.lowestCategory.value,
        additionalInfo: fetchedData.lowestCategory.text || "This month",
        icon: <FaHashtag />,
      });

      return payload;
    },
  });

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
