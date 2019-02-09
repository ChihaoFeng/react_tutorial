import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

const purchase_burger_success = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

const purchase_burger_fail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

const purchase_burger_start = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchase_burger = (orderData, token) => {
  return dispatch => {
    dispatch(purchase_burger_start());
    axios.post('/orders.json?auth=' + token, orderData)
      .then(response => {
        dispatch(purchase_burger_success(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchase_burger_fail(error));
      });
  }
};

export const purchase_init = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

const fetch_orders_start = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

const fetch_orders_success = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

const fetch_orders_fail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetch_orders = (token) => {
  return dispatch => {
    dispatch(fetch_orders_start());
    axios.get('./orders.json?auth=' + token)
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        console.log(fetchedOrders);
        dispatch(fetch_orders_success(fetchedOrders))
      }).catch( err => {
        dispatch(fetch_orders_fail(err));
    });
  };
};
