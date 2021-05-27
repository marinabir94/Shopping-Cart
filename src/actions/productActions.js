//Redux-

import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  SORT_PRODUCTS_BY_PRICE,
} from "../types";

const PORT = process.env.PORT || 5000;

//Fetch all products from the database
export const fetchProducts = () => async (dispatch) => {
  fetch("http://localhost:" + PORT + "/api/products", {
    method: "GET"
    })
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      dispatch({
        type: FETCH_PRODUCTS,
        payload: data,
      });
    });
};

//Filter products by size
export const filterProducts = (products, size) => (dispatch) => {
  let filteredProducts = products.slice();
  if (size !== "") {
    filteredProducts = products.slice().filter(
      (product) => product.availableSizes.indexOf(size) >= 0
    );
  }
  console.log(filteredProducts);
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items: filteredProducts,
    },
  });
};


//Sort products by price
export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();
  if (sort === "" || sort === "newer") {
    //Sort by ID
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    //Sort by price
    sortedProducts.sort((a, b) =>
      sort === "lower-higher"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }
  console.log(sortedProducts);
  dispatch({
    type: SORT_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};
