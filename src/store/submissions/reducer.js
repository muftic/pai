const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "subs/fetched":
      return [...action.payload];
    case "subs/add":
      return [...state, action.payload];

    default:
      return state;
  }
};
