import { useReducer, createContext, useContext } from "react";
import { reducer } from "./reducer";
import { useEffect } from "react";
import {
  CANCEL_DELETE,
  DELETE,
  SET_COMMENTS,
  TOGGLE_SCORE_SWITCH,
} from "./action";

export const AppContext = createContext();

const initialState = {
  increaseLikes: true,
  decreaseLikes: true,
  personComment: [],
};

export const useGlobalState = () => {
  return useContext(AppContext);
};

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // fetch comment
    const fetchComment = async () => {
      const response = await fetch("./data.json");
      const usersComments = await response.json();

      // update person comment state with fetch data
      dispatch({ type: SET_COMMENTS, payload: usersComments });
    };

    fetchComment();
  }, []);

  const cancelDeleteRequest = () => {
    dispatch({ type: CANCEL_DELETE });
  };

  const deleteComment = (id, type, index) => {
    dispatch({ type: DELETE, payload: { id, type, index } });
  };

  const handleSwitch = (actionType, id, type, index, liked, setIsLiked) => {
    if (actionType === "increase" && !liked) {
      dispatch({
        type: TOGGLE_SCORE_SWITCH,
        payload: { actionType, id, type, index, liked },
      });

      setIsLiked(!liked);
      return;
    }

    if (actionType === "decrease" && liked) {
      dispatch({
        type: TOGGLE_SCORE_SWITCH,
        payload: { actionType, id, type, index, liked },
      });
      setIsLiked(!liked);
      return;
    }
    return;
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        deleteComment,
        cancelDeleteRequest,
        handleSwitch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Context;
