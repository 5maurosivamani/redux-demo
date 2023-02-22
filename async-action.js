const redux = require("redux");
const reduxThunk = require("redux-thunk").default;
const axios = require("axios");

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const initialState = {
  isLoading: false,
  users: [],
  error: "",
};

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersFailure = (err) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        users: [...action.payload],
        isLoading: false,
        err: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        err: action.payload,
        users: [],
        isLoading: false,
      };
    default:
      return state;
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) =>
        dispatch(fetchUsersSuccess(res.data.map((user) => user.username)))
      )
      .catch((err) => dispatch(fetchUsersFailure(err)));
  };
};

const store = createStore(usersReducer, applyMiddleware(reduxThunk));

store.subscribe(() => {
  console.log("Initial State", store.getState());
});

store.dispatch(fetchUsers());
