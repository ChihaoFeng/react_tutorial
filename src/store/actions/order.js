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
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchase_burger = (orderData) => {
  return dispatch => {
    dispatch(purchase_burger_start());
    axios.post('/orders.json', orderData)
      .then(response => {
        dispatch(purchase_burger_success(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchase_burger_fail(error));
      });
  }
};
