const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "challenges/fetched":
      return [...action.payload];

    default:
      return state;
  }
};
