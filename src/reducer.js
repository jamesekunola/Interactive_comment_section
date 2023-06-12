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
      const comment = [...state.personComment.comments, ...currentReply];
      const newComment = { ...state.personComment, comments: comment };

      return {
        ...state,
        personComment: newComment,
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
    // console.log(action.payload);
    const { editedText, id, index, type } = action.payload;

    if (type === "comment") {
      const comment = state.personComment.comments.find((comment) => {
        return comment.id === id;
      });

      const updatedComment = { ...comment, content: editedText };
      const editedComment = [...state.personComment.comments];
      editedComment[index] = updatedComment;

      const newLIst = { ...state.personComment, comments: editedComment };

      return {
        ...state,
        personComment: newLIst,
      };
    } else {
      const replyMsgIndex = state.personComment.comments[
        index
      ].replies.findIndex((comment) => comment.id === id);

      const comment = state.personComment.comments[index].replies.find(
        (comment) => comment.id === id
      );

      const updatedReplies = { ...comment, content: editedText };
      const editedComment = [...state.personComment.comments];
      editedComment[index].replies[replyMsgIndex] = updatedReplies;

      const updatedEditedMsg = {
        ...state.personComment,
        comment: editedComment,
      };

      return {
        ...state,
        personComment: updatedEditedMsg,
      };
    }
  }

  // delete comment
  if (action.type === DELETE) {
    const { type, id, index } = action.payload;

    if (type === "comment") {
      const comment = [...state.personComment.comments].filter((itm) => {
        return itm.id !== id;
      });
      const modifiedComment = { ...state.personComment, comments: comment };

      return {
        ...state,
        personComment: modifiedComment,
      };
    } else {
      const comment = [...state.personComment.comments];
      const tempReplies = comment[index].replies;

      const filteredReplyList = tempReplies.filter((reply) => reply.id !== id);
      comment[index].replies = filteredReplyList;

      const modifiedCommentList = {
        ...state.personComment,
        comments: comment,
      };

      return {
        ...state,
        personComment: modifiedCommentList,
      };
    }
  }

  if (action.type === TOGGLE_SCORE_SWITCH) {
    const { id, actionType, type, index } = action.payload;

    if (actionType === "increase" && type === "comment") {
      return {
        ...state,
        personComment: {
          ...state.personComment,
          comments: [
            ...state.personComment.comments.map((comment, i) =>
              i === index ? { ...comment, score: comment.score + 1 } : comment
            ),
          ],
        },
      };
    }

    if (actionType === "increase" && type === "replies") {
      return {
        ...state,
        personComment: {
          ...state.personComment,
          comments: [
            ...state.personComment.comments.map((comment, i) =>
              i === index
                ? {
                    ...comment,
                    replies: [
                      ...comment.replies.map((reply) =>
                        reply.id === id
                          ? { ...reply, score: reply.score + 1 }
                          : reply
                      ),
                    ],
                  }
                : comment
            ),
          ],
        },
      };
    }

    if (actionType === "decrease" && type === "comment") {
      return {
        ...state,
        personComment: {
          ...state.personComment,
          comments: [
            ...state.personComment.comments.map((comment, i) =>
              i === index ? { ...comment, score: comment.score - 1 } : comment
            ),
          ],
        },
      };
    }

    if (actionType === "decrease" && type === "replies") {
      return {
        ...state,
        personComment: {
          ...state.personComment,
          comments: [
            ...state.personComment.comments.map((comment, i) =>
              i === index
                ? {
                    ...comment,
                    replies: [
                      ...comment.replies.map((reply) =>
                        reply.id === id
                          ? { ...reply, score: reply.score - 1 }
                          : reply
                      ),
                    ],
                  }
                : comment
            ),
          ],
        },
      };
    }

    return state;
  }

  return state;
};
