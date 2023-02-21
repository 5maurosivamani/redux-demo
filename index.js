const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreater = redux.bindActionCreators

const ORDER_CAKE = "ORDER_CAKE";
const RESTACK_CAKE = "RESTACK_CAKE";

const orderCake = () => {
  return {
    type: ORDER_CAKE,
    quantity: 1,
  };
};

const restackCake = (qty = 1) => {
  return {
    type: RESTACK_CAKE,
    payload: qty,
  };
};

const intialState = {
  numOfCakes: 10,
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case ORDER_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case RESTACK_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

console.log("Initial State: ", store.getState());

const unSubscribe = store.subscribe(() => {
  console.log("Updated State: ", store.getState());
});

const actions = bindActionCreater({orderCake, restackCake}, store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.orderCake()

actions.restackCake(10)

unSubscribe();
