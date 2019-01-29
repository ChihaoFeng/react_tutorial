import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const add_ingredient = (ingName) => {
  return {type: actionTypes.ADD_INGREDIENT, ingredientName: ingName};
};

export const remove_ingredient = (ingName) => {
  return {type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName};
};

const set_ingredients = (ingredients) => {
  return {type: actionTypes.SET_INGREDIENTS, ingredients: ingredients};
};

const fetch_ingredients_failed = () => {
  return {type: actionTypes.FETCH_INGREDIENTS_FAILED};
};

export const init_ingredient = () => {
  return dispatch => {
    axios.get('/ingredients.json').then(response => {
      dispatch(set_ingredients(response.data));
    })
      .catch(error => {
        dispatch(fetch_ingredients_failed());
      });
  };
};