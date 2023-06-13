import { useReducer, createContext, useContext } from "react";
import { reducer } from "./reducer";
import { useEffect } from "react";
import {
  CANCEL_DELETE,
  DELETE,
  SET_COMMENTS,
  TOGGLE_SCORE_SWITCH,
  SUBMIT_REPLY,
} from "./action";

export const AppContext = createContext();

const initialState = {
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

      // Process the fetched data and update the person's comment state
      dispatch({ type: SET_COMMENTS, payload: usersComments });
    };

    fetchComment();
  }, []);

  // function to cancel delete request
  const cancelDeleteRequest = () => {
    dispatch({ type: CANCEL_DELETE });
  };

  // function to delete comment
  const deleteComment = (id, type, index) => {
    dispatch({ type: DELETE, payload: { id, type, index } });
  };

  // function to increase/ decrease score
  const handleSwitch = (actionType, id, type, index, liked, setIsLiked) => {
    if (
      (actionType === "increase" && !liked) ||
      (actionType === "decrease" && liked)
    ) {
      dispatch({
        type: TOGGLE_SCORE_SWITCH,
        payload: { actionType, id, type, index, liked },
      });
      setIsLiked(!liked);
    }
  };

  // function to submit user reply
  const submitReply = (
    userText,
    replyingTo,
    id,
    type,
    index,
    setIsReplyBtnClicked
  ) => {
    let userReply = userText.current;

    // Check if the user has entered any text in the text box. Return if the context is empty when the user clicks on the reply button.
    if (
      !userReply.value ||
      (userReply.value.startsWith("@") &&
        userReply.value.length === replyingTo.length)
    )
      return;

    // Initialize an array called currentReply to store details of a user's reply in a comment system.
    const currentReply = [
      {
        id: new Date().getTime(),
        content: userReply.value,
        createdAt: "now",
        score: 0,
        replies: [],
        replyingTo: "",
        user: {
          ...state.personComment.currentUser,
        },
      },
    ];

    // Set the text back to an empty string after the user has submitted their reply.
    userReply.value = replyingTo;

    // Update the state and display all the comments that the user has made.
    dispatch({
      type: SUBMIT_REPLY,
      payload: { id, type, currentReply, index },
    });

    // Close the reply text box after the user has submitted their comment.
    if (setIsReplyBtnClicked) setIsReplyBtnClicked(false);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        deleteComment,
        cancelDeleteRequest,
        handleSwitch,
        submitReply,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Context;
