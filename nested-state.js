const redux = require("redux");
const immer = require("immer");
const produce = immer.produce;

const createStore = redux.createStore;

const UPDATE_ADDRESS = "UPDATE_ADDRESS";

const updateAddress = (street = "") => {
  return {
    type: UPDATE_ADDRESS,
    payload: street,
  };
};

const addressState = {
  name: "Sivamani",
  address: {
    street: "Azhakar Street",
    city: "Chennai",
    state: "TamilNadu",
  },
};

const addressReducer = (state = addressState, action) => {
  switch (action.type) {
    case UPDATE_ADDRESS:
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
  }
};

const store = createStore(addressReducer);

console.log("Initial State", store.getState());

const unSubscribe = store.subscribe(() =>
  console.log("Updated State", store.getState())
);

store.dispatch(updateAddress("Azhakar 1"));
store.dispatch(updateAddress("Azhakar 2"));
store.dispatch(updateAddress("Azhakar 3"));

unSubscribe();
