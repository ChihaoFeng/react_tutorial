import * as actionTypes from './actionTypes';

export const add_ingredient = (ingName) => {
  return {type: actionTypes.ADD_INGREDIENT, ingredientName: ingName};
};

export const remove_ingredient = (ingName) => {
  return {type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName};
};