// import fetch from 'isomorphic-unfetch'
import filterProductList from "../../util/filterProduct";
import * as Types from "../constants/actionTypes";
import axios from "axios";

// Fetch Product fetchProduct
export const fetchProduct = (url) => async (dispatch) => {
  try {
    const response = await axios.get(url);
    const data = response.data.products;

    window.products = data;

    dispatch({
      type: Types.FETCHED_PRODUCT,
      payload: { products: data },
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchProducts = (url) => async (dispatch) => {
  try {
    const response = await axios.get(url);
    const totalProducts = response.data.data.totalProducts;
    const totalPages = response.data.data.totalPages;
    const data = response.data.data.products;

    dispatch({
      type: Types.FETCHED_PRODUCT,
      payload: {
        products: data,
        totalPages: totalPages,
        totalProducts: totalProducts,
      },
    });
  } catch (e) {
    dispatch({
      type: Types.FETCHED_PRODUCT,
      payload: {
        products: [],
        totalPages: 1,
        totalProducts: 0,
      },
    });
    console.log(e);
  }
};

// Fetch More Product
export const fetchMoreProduct = (url, total) => async (dispatch) => {
  try {
    const sendRequest = await fetch(url);
    const data = await sendRequest.json();

    // const searchedItems = searchItemsByText(searchTerm,data)
    // const filteredList  = filterProductList(searchedItems,filters)

    dispatch({
      type: Types.FETCHED_MORE_PRODUCT,
      payload: { products: data, total },
    });
  } catch (error) {
    console.log(error);
  }
};

// Fetch Product By Category

export const fetchByCategory = async (url, filters) => {
  try {
    const sendRequest = await axios.get(url);
    const data = sendRequest.data;
    const filteredList = filterProductList(data, filters);

    return filteredList;
  } catch (error) {
    console.log(error);
  }
};

export const fetchFeatured = async (url) => {
  try {
    const sendRequest = await axios.get(url);
    const data = sendRequest.data.data.productsWithDetails;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPopular = async (url) => {
  try {
    const sendRequest = await axios.get(url);
    const data = sendRequest.data.data.productsWithDetails;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTopSelling = async (url) => {
  try {
    const sendRequest = await axios.get(url);
    const data = sendRequest.data.data.productsWithDetails;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTopRated = async (url) => {
  try {
    const sendRequest = await axios.get(url);
    const data = sendRequest.data.data.productsWithDetails;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchNewAdded = async (url) => {
  try {
    const sendRequest = await axios.get(url);
    const data = sendRequest.data.data.productsWithDetails;

    return data;
  } catch (error) {
    console.log(error);
  }
};
