import axios from "axios";

export const getCategoryList = async () => {
  const response = await axios.get("https://dummyjson.com/products/categories");
  return response.data;
};

export const getCategoryListBySlug = async (slug: string) => {
  const response = await axios.get(
    `https://dummyjson.com/products/category/${slug}`
  );
  return response.data;
};
