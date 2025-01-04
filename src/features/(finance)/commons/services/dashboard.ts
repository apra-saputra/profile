import { db } from "@/libs/firebase/firebase";
import GlobalError from "@/libs/globalError";
import { collection, getDocs } from "firebase/firestore";
import { fetchFinanceLog } from "./financeLog";
import {
  getMonthNamesByLocale,
  getThisMonth,
} from "../utils/functions/getMonthList";
import { FinanceLog } from "../types/finance/financeLog";

export const fetchPieData = async (userRef: string) => {
  try {
    const collectionRef = collection(db, "categoryCreditFinance");

    const categorySnapshot = await getDocs(collectionRef);

    const financeLog = await fetchFinanceLog({ userRef, limit: 10000 });

    const payload = await Promise.all(
      categorySnapshot.docs.map(async (document) => {
        const category = document.data();

        const categoryFinance = financeLog.filter(
          (log) => log.category.name === category.name
        );

        const value = categoryFinance
          .map((el) => el.amount)
          .reduce((a, b) => a + b, 0);

        return {
          name: category.name,
          value,
          fill: `var(--color-${category.name
            .replaceAll(/[^\w-]/g, "")
            .replaceAll(" ", "-")})`,
        };
      })
    );

    return payload;
  } catch (error) {
    throw new GlobalError(error);
  }
};

export const fetchChartData = async (userRef: string) => {
  try {
    const date = new Date(),
      year = date.getFullYear(),
      startDate = new Date(year, 0, 1),
      endDate = new Date(year, 11, 31),
      payload = [];

    const logData = await fetchFinanceLog({
      userRef,
      limit: 10000,
      startDate,
      endDate,
    });

    const monthList = getMonthNamesByLocale();
    const groupedData: { [x: string]: FinanceLog[] } = {};

    monthList.forEach((month) => {
      groupedData[month] = [];
    });

    // Group logData by month
    logData.forEach((entry) => {
      const entryDate = new Date(entry.createdAt);
      const monthName = monthList[entryDate.getMonth()];
      groupedData[monthName].push(entry);
    });

    for (const key in groupedData) {
      const element = groupedData[key];
      let temp = {
        month: key,
        highest: { value: 0, category: "category" },
        lowest: { value: 0, category: "category" },
      };

      if (element.length) {
        const tempData = await groupingDataBaseOnCategory(element);
        temp.highest = {
          value: tempData.mostCategory.value,
          category: tempData.mostCategory.text || "category",
        };
        temp.lowest = {
          value: tempData.lowestCategory.value,
          category: tempData.lowestCategory.text || "category",
        };
      }

      payload.push(temp);
    }

    return payload;
  } catch (error) {
    throw new GlobalError(error);
  }
};

type ItemPayload = {
  value: number;
  text?: string;
};

type PayloadFetchBanners = {
  mostCategory: ItemPayload;
  lowestCategory: ItemPayload;
  totalAmount: ItemPayload;
};

export const fetchBanners = async ({
  userRef,
  startDate,
  endDate,
}: {
  userRef: string;
  startDate?: Date;
  endDate?: Date;
}) => {
  try {
    const financeLog = await fetchFinanceLog({
      userRef,
      limit: 1000,
      startDate,
      endDate,
    });

    const payload = await groupingDataBaseOnCategory(financeLog);

    return payload;
  } catch (error) {
    throw new GlobalError(error);
  }
};

const groupingDataBaseOnCategory = async (financeLog: FinanceLog[]) => {
  let payload: PayloadFetchBanners = {
    mostCategory: { value: 0, text: "No Category" },
    lowestCategory: { value: 0, text: "No Category" },
    totalAmount: { value: 0, text: undefined },
  };

  if (!financeLog.length) {
    return payload;
  }

  // total amount
  const totalAmount = financeLog
    .map((log) => log.amount)
    .reduce((a, b) => a + b, 0);

  payload.totalAmount = { value: totalAmount, text: getThisMonth() };

  // most expense and lowest base on category
  let obj: Record<string, any> = {};
  financeLog.forEach((log) => {
    if (!obj[log.category.name]) {
      obj[log.category.name] = { value: 0 };
    }
    obj[log.category.name] = {
      value: obj[log.category.name].value + log.amount,
    };
  });

  const temp = Object.keys(obj)
    .map((key) => {
      return { key: key, value: obj[key].value };
    })
    .sort((a, b) => a.value - b.value); // desc;

  payload.lowestCategory = { value: temp[0].value, text: temp[0].key };
  payload.mostCategory = {
    value: temp[temp.length - 1].value,
    text: temp[temp.length - 1].key,
  };

  return payload;
};
