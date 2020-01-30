import actionTypes from '../actions/ActionType';
import {InitialState} from '../InitialState';

const fetchAllUsers = (state, action) => {
    console.log('in reducer', state, action);
    return {
        ...state,
        users: [...action.users]
    }
};
const getUser = (state, action) => {
    console.log('func in reducer fired');
};
const updateUser = (state, action) => {
    return {
        ...state,
        users: [...action.users]
    }
};
const createUser = (state, action) => {
    return {
        ...state,
        users: [...action.users]
    }
};
const deleteUser = (state, action) => {
    return {
        ...state,
        users: [...action.users]
    }
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
      case actionTypes.FETCH_ALL_USERS:
          return fetchAllUsers(state, action);
      case actionTypes.GET_USER:
          return getUser(state, action);
      case actionTypes.UPDATE_USER:
          return updateUser(state, action);
      case actionTypes.CREATE_USER:
          return createUser(state, action);
      case actionTypes.DELETE_USER:
          return deleteUser(state, action);
      default:
          return state
  }
};

export default reducer