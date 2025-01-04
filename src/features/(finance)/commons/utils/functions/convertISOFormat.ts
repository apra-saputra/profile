export const convertISOFormat = (input: Date) => {
    const date = new Date(input);
  
    return date.toLocaleString("id-ID", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    //   hour: "numeric",
    //   minute: "numeric",
    //   timeZoneName: "short",
    });
  };