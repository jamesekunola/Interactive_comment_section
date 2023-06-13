import {
  SET_COMMENTS,
  SUBMIT_REPLY,
  UPDATE,
  DELETE,
  TOGGLE_SCORE_SWITCH,
} from "./action";

export const reducer = (state, action) => {
  if (action.type === SET_COMMENTS) {
    return {
      ...state,
      personComment: action.payload,
    };
  }

  if (action.type === SUBMIT_REPLY) {
    const { type, index, currentReply } = action.payload;

    if (type === "send") {
      return {
        ...state,
        personComment: {
          ...state.personComment,
          comments: [...state.personComment.comments, ...currentReply],
        },
      };
    } else {
      return {
        ...state,
        personComment: {
          ...state.personComment,
          comments: state.personComment.comments.map((comment, i) =>
            i === index
              ? {
                  ...comment,
                  replies: [...comment.replies, ...currentReply],
                }
              : comment
          ),
        },
      };
    }
  }

  if (action.type === UPDATE) {
    const { editedText, id, index, type } = action.payload;

    if (type === "comment") {
      const updatedComment = {
        ...state.personComment.comments[index],
        content: editedText,
      };
      const editedComments = [...state.personComment.comments];
      editedComments[index] = updatedComment;

      return {
        ...state,
        personComment: {
          ...state.personComment,
          comments: editedComments,
        },
      };
    } else {
      const commentIndex = state.personComment.comments[
        index
      ].replies.findIndex((comment) => comment.id === id);
      const updatedReply = {
        ...state.personComment.comments[index].replies[commentIndex],
        content: editedText,
      };
      const editedReplies = [...state.personComment.comments[index].replies];
      editedReplies[commentIndex] = updatedReply;

      return {
        ...state,
        personComment: {
          ...state.personComment,
          comments: state.personComment.comments.map((comment, i) =>
            i === index
              ? {
                  ...comment,
                  replies: editedReplies,
                }
              : comment
          ),
        },
      };
    }
  }

  if (action.type === DELETE) {
    const { type, id, index } = action.payload;

    if (type === "comment") {
      const filteredComments = state.personComment.comments.filter(
        (itm) => itm.id !== id
      );

      return {
        ...state,
        personComment: {
          ...state.personComment,
          comments: filteredComments,
        },
      };
    } else {
      const comments = [...state.personComment.comments];
      const replies = comments[index].replies.filter(
        (reply) => reply.id !== id
      );
      comments[index].replies = replies;

      return {
        ...state,
        personComment: {
          ...state.personComment,
          comments: comments,
        },
      };
    }
  }

  if (action.type === TOGGLE_SCORE_SWITCH) {
    const { id, actionType, type, index } = action.payload;

    if (actionType === "increase") {
      if (type === "comment") {
        return {
          ...state,
          personComment: {
            ...state.personComment,
            comments: state.personComment.comments.map((comment, i) =>
              i === index ? { ...comment, score: comment.score + 1 } : comment
            ),
          },
        };
      } else {
        return {
          ...state,
          personComment: {
            ...state.personComment,
            comments: state.personComment.comments.map((comment, i) =>
              i === index
                ? {
                    ...comment,
                    replies: comment.replies.map((reply) =>
                      reply.id === id
                        ? { ...reply, score: reply.score + 1 }
                        : reply
                    ),
                  }
                : comment
            ),
          },
        };
      }
    }

    if (actionType === "decrease") {
      if (type === "comment") {
        return {
          ...state,
          personComment: {
            ...state.personComment,
            comments: state.personComment.comments.map((comment, i) =>
              i === index ? { ...comment, score: comment.score - 1 } : comment
            ),
          },
        };
      } else {
        return {
          ...state,
          personComment: {
            ...state.personComment,
            comments: state.personComment.comments.map((comment, i) =>
              i === index
                ? {
                    ...comment,
                    replies: comment.replies.map((reply) =>
                      reply.id === id
                        ? { ...reply, score: reply.score - 1 }
                        : reply
                    ),
                  }
                : comment
            ),
          },
        };
      }
    }

    return state;
  }

  return state;
};
