import {
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    CART_ITEM_CLEAR,
    CART_SAVE_SHIPPING_ADDRESS,
  } from "../constraints/cart";
  
  export const cartReducer = (
    state = { cartItems: [], shippingAddress: {} },
    action
  ) => {
    switch (action.type) {
      case ADD_ITEM_TO_CART: {
        const item = action.payload;
        const existItem = state.cartItems.find(
          (cartItem) => cartItem.product === item.product
        );
  
        return {
          ...state,
          cartItems: existItem
            ? state.cartItems.map((cartItem) =>
                cartItem.product === item.product ? item : cartItem
              )
            : [...state.cartItems, item],
        };
      }
  
      case REMOVE_ITEM_FROM_CART:
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (cartItem) => cartItem.product !== action.payload
          ),
        };
  
      case CART_ITEM_CLEAR:
        return { ...state, cartItems: [] };
  
      case CART_SAVE_SHIPPING_ADDRESS:
        return { ...state, shippingAddress: action.payload };
  
      default:
        return state;
    }
  };
  