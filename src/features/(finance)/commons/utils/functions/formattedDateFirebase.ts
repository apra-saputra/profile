import { Timestamp } from "firebase/firestore";

export const formattedDateFirebase = (date: Timestamp) => {
  try {
    // Pastikan objek Timestamp valid
    const validDate =
      date instanceof Timestamp ? date.toDate() : new Date(date);

    return validDate.toLocaleDateString("id-ID", {
      dateStyle: "full",
    });
  } catch (error) {
    console.error("Invalid date format:", error);
    return "Invalid Date";
  }
};
