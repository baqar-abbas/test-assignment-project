// / Centralize all product-related API calls
// - fetchAllProducts(limit, skip) - with pagination support
// - fetchProductById(id) - for single product
// - searchProducts(query) - for search functionality
// - fetchCategories() - to get all categories
// - fetchProductsByCategory(category)

import axios from "axios";

const API_BASE_URL = "https://dummyjson.com";

export const fetchProducts = async (limit = 10, skip = 0) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { limit, skip },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};
