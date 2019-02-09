import * as actionTypes from '../actions/actionTypes';
import updateObject from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authStart = (state) => {
  return updateObject(state, {error: null, loading: true})
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.authData.idToken,
    userId: action.authData.localId,
    error: null,
    loading: false
  })
};

const authFail = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    error: action.authData,
    loading: false
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    default:
      return state;
  }
};

export default reducer;