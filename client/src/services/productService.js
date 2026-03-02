import api from "./api";

export const getAllProducts = async (category = "") => {
  const url = category ? `/products?category=${category}` : "/products";
  const response = await api.get(url);
  return response;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response;
};

export const getCategories = () => {
  return ["Electronics", "Clothing", "Books", "Food", "Sports"];
};
