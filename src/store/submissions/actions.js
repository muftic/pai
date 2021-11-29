import { appLoading, appDoneLoading } from "../appState/actions";

import { apiUrl } from "../../config/constants";
import axios from "axios";
export const fetchSubs = () => {
  return async (dispatch, getState) => {
    // get token from the state
    // if we have no token, stop

    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/submissions`);

      // token is still valid
      console.log(response);
      dispatch({ type: "subs/fetched", payload: response.data.submissions });
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
    }
  };
};
