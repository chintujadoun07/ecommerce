// Import statements
import axios from "axios";
import {
    ORDER_REQ,
    ORDER_SUCCESS,
    ORDER_DETAIL_REQ,
    ORDER_DETAIL_REQ_FAIL,
    ORDER_DETAIL_REQ_SUCCESS,
    ORDER_PAYMENT_REQ,
    ORDER_PAYMENT_REQ_FAIL,
    ORDER_PAYMENT_REQ_SUCCESS,
    ORDER_LIST_REQ,
    ORDER_LIST_REQ_FAIL,
    ORDER_LIST_REQ_SUCCESS
} from "../Constraints/Order";

import { CART_ITEM_CLEAR } from "../Constraints/card";
import { userLogoutAction } from "./UserAction";

// Order action
export const orderAction = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_REQ });
        const userInfo = getState().userLogin.userInfo;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.post(
            "http://localhost:3000/api/orders",
            order,
            config
        );
        dispatch({ type: ORDER_SUCCESS, payload: data });
        dispatch({ type: CART_ITEM_CLEAR });
    } catch (error) {
        console.log(error);
    }
};

// Order payment action
export const orderPaymentAction = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAYMENT_REQ });
        const userInfo = getState().userLogin.userInfo;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(
            `http://localhost:3000/api/orders/${orderId}/payment`,
            paymentResult,
            config
        );
        dispatch({ type: ORDER_PAYMENT_REQ_SUCCESS, payload: data });
        dispatch(orderDetailAction(orderId));
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        if (message === "Not authorized!") {
            dispatch(userLogoutAction());
        }
        dispatch({ type: ORDER_PAYMENT_REQ_FAIL, payload: message });
    }
};

// Order detail action
export const orderDetailAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAIL_REQ });
        const userInfo = getState().userLogin.userInfo;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `http://localhost:3000/api/orders/${id}`,
            config
        );
        dispatch({ type: ORDER_DETAIL_REQ_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        if (message === "Not authorized!") {
            dispatch(userLogoutAction());
        }
        dispatch({ type: ORDER_DETAIL_REQ_FAIL, payload: message });
    }
};

// Order list action
export const orderListAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQ });
        const userInfo = getState().userLogin.userInfo;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            "http://localhost:3000/api/orders",
            config
        );
        dispatch({ type: ORDER_LIST_REQ_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        if (message === "Not authorized!") {
            dispatch(userLogoutAction());
        }
        dispatch({ type: ORDER_LIST_REQ_FAIL, payload: message });
    }
};
