//Redux

import { FETCH_PRODUCTS } from "../types";

//Fetch all products from the database
export const fetchProducts = () => async (dispatch) => {
  fetch('http://localhost:5000/api/products')
  .then(data => data.json())
  .then((data) => {
      console.log(data);
      dispatch({
        type: FETCH_PRODUCTS,
        payload: data,
      });
  });


  // const res = await fetch("/api/products");
  // const data = await res.json();
  // console.log(data);
  // dispatch({
  //   type: FETCH_PRODUCTS,
  //   payload: data,
  // });
};
