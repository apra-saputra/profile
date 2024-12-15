import { useState, useEffect } from "react";
import { fetchCategories } from "../services/category";
import { CategoryCredit } from "../types/category";

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryCredit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // const addNewCategory = async (category: Omit<CategoryCredit, "id">) => {
  //   const newCategory = await addCategory(category);
  //   setCategories((prev) => [...prev, newCategory]);
  // };

  // const removeCategory = async (id: string) => {
  //   await deleteCategory(id);
  //   setCategories((prev) => prev.filter((cat) => cat.id !== id));
  // };

  return { categories, loading, error };
};
