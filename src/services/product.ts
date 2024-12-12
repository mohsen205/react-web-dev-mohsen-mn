import axios from "axios";
import { FilterInt } from "./filter";

export const getProductsList = async ({
  skip = 10,
  limit = 10,
  select,
  categories,
  order,
  q,
  sortBy,
}: FilterInt) => {
  let url = "https://dummyjson.com/products";

  if (q) {
    url = `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}`;
  }

  const params = {
    skip,
    limit,
    ...(select && { select }),
    ...(categories && { categories }),
    ...(order && { order }),
    ...(sortBy && { sortBy }),
  };

  const response = await axios.get(url, { params });
  return response.data;
};

export const getProductById = async (id: number | string) => {
  const response = await axios.get(`https://dummyjson.com/products/${id}`);
  return response.data;
};
