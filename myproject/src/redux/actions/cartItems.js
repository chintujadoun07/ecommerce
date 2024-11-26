import axios from "axios";
import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_ITEM_CLEAR,
} from "../constraints/cart"; // Ensure the path is correct
import { BASE_URL }  from '../constraints/BASE_URL'

// Add item to cart
export const addToCartAction = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
    dispatch({
      type: ADD_ITEM_TO_CART,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    // Update localStorage after state change
    const { cartReducer } = getState();
    localStorage.setItem("cartItems", JSON.stringify(cartReducer.cartItems));
  } catch (error) {
    console.error("Error adding item to cart:", error.message || error);
  }
};

// Remove item from cart
export const removeFromCartAction = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_FROM_CART,
    payload: id,
  });

  // Update localStorage after state change
  const { cartReducer } = getState();
  localStorage.setItem("cartItems", JSON.stringify(cartReducer.cartItems));
};

// Save shipping address
export const saveShippingAddressAction = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  // Save shipping address in localStorage
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

// Clear cart
export const clearCartAction = () => (dispatch) => {
  dispatch({ type: CART_ITEM_CLEAR });
  localStorage.removeItem("cartItems");
};

