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
      const resChallenges = await axios.get(`${apiUrl}/challenges`);
      // token is still valid
      console.log(resChallenges, response);
      dispatch({ type: "subs/fetched", payload: response.data.submissions });
      dispatch({
        type: "challenges/fetched",
        payload: resChallenges.data.challenges,
      });
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
