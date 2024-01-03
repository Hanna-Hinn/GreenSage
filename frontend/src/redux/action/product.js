// import fetch from 'isomorphic-unfetch'
import filterProductList from "../../util/filterProduct";
import searchItemsByText from "../../util/searchItemsByText";
import * as Types from "../constants/actionTypes";
import axios from "axios";
import { BACKEND_URL } from "../../config/index";
// Fetch Product fetchProduct
export const fetchProduct = (searchTerm, url, filters) => async (dispatch) => {
  try {
    const response = await axios.get(
      searchTerm
        ? `${BACKEND_URL}/products/v1/search?productName=${searchTerm}`
        : url
    );
    const data = searchTerm ? response.data.data : response.data.data.products;

    window.products = data;

    dispatch({
      type: Types.FETCHED_PRODUCT,
      payload: { products: data },
    });
  } catch (error) {
    console.log(error);
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

export const fetchFeatured = async (url, filters) => {
  try {
    const sendRequest = await axios.get(url);
    const data = sendRequest.data.data.productsWithDetails;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPopular = async (url, filters) => {
  try {
    const sendRequest = await axios.get(url);
    const data = sendRequest.data.data.productsWithDetails;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTopSelling = async (url, filters) => {
  try {
    const sendRequest = await axios.get(url);
    const data = sendRequest.data.data.productsWithDetails;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTopRated = async (url, filters) => {
  try {
    const sendRequest = await axios.get(url);
    const data = sendRequest.data.data.productsWithDetails;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchNewAdded = async (url, filters) => {
  try {
    const sendRequest = await axios.get(url);
    const data = sendRequest.data.data.productsWithDetails;

    return data;
  } catch (error) {
    console.log(error);
  }
};
