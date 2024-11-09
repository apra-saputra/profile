import { useEffect } from "react";

const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    const text = title
      ? title[0].toUpperCase() + title.slice(1)
      : "My profile page | Apra-saputra";

    document.title = text;

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute("content", text);
    }
  }, [title]);

  return null;
};

export default useDocumentTitle;
