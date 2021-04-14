import { CLEAR_CART, CLEAR_ORDER, CREATE_ORDER } from "../types";

export const createOrder = (order) => async (dispatch) =>{
    fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order)
    })
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      dispatch({
        type: CREATE_ORDER,
        payload: data,
      });
      localStorage.clear("cartItems");
      dispatch({
        type: CLEAR_CART
      })
    });
};

export const clearOrder = () => (dispatch) => {
    dispatch({
        type: CLEAR_ORDER
    })
}