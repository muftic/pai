const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "subs/fetched":
      return [...action.payload];

    default:
      return state;
  }
};
