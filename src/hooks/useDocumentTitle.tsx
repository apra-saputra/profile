import { useEffect } from "react";

const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    document.title = `My Components ${title ? "| " + title : ""}`;

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "My Component to use component that i used with react"
      );
    }

  }, [title]);

  return null;
};

export default useDocumentTitle;
