import {
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    CART_ITEM_CLEAR,
    CART_SAVE_SHIPPING_ADDRESS

} from '../Constraints/card' // Ensure the correct path here

export const cartReducer = (
    state = { cartItems: [], shippingAddress: {} }, action
) => {
    switch (action.type) { 
        case ADD_ITEM_TO_CART:
            { const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);

            return existItem
                ? {
                      ...state,
                      cartItems: state.cartItems.map((x) =>
                          x.product === item.product ? item : x
                      ),
                  }
                : {
                      ...state,
                      cartItems: [...state.cartItems, item],
                  }; } 

        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            };

        case CART_ITEM_CLEAR:
            return { ...state, cartItems: [] };
          
         case  CART_SAVE_SHIPPING_ADDRESS  :
            return { ...state, shippingAddress: action.payload }; 

        default:
            return state;
    }
};
