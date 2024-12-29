import { db } from "@/libs/firebase/firebase";
import GlobalError from "@/libs/globalError";
import { collection, getDocs } from "firebase/firestore";
import { fetchFinanceLog } from "./financeLog";
import { getThisMonth } from "../utils/functions/getMonthList";

export const fetchPieData = async (userRef: string) => {
  try {
    const collectionRef = collection(db, "categoryCreditFinance");

    const categorySnapshot = await getDocs(collectionRef);

    const financeLog = await fetchFinanceLog(userRef, 1000);

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

type ItemPayload = {
  value: number;
  text?: string;
};

type PayloadFetchBanners = {
  mostCategory: ItemPayload;
  lowestCategory: ItemPayload;
  totalAmount: ItemPayload;
};

export const fetchBanners = async (userRef: string) => {
  try {
    const financeLog = await fetchFinanceLog(userRef, 1000);

    let payload: PayloadFetchBanners = {
      mostCategory: { value: 0, text: "string" },
      lowestCategory: { value: 0, text: "string" },
      totalAmount: { value: 0, text: undefined },
    };

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

    payload.mostCategory = { value: temp[0].value, text: temp[0].key };
    payload.lowestCategory = {
      value: temp[temp.length - 1].value,
      text: temp[temp.length - 1].key,
    };

    return payload;
  } catch (error) {
    throw new GlobalError(error);
  }
};
