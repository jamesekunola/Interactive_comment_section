import { useGlobalState } from "../context";
import { useRef, useEffect } from "react";

const CommentTextbox = ({
  user = "",
  text,
  type,
  id,
  index,
  setIsReplyBtnClicked,
}) => {
  const userText = useRef(null);
  const replyingToUsername = user ? "@" + user + " " : "";

  useEffect(() => {
    userText.current.value = replyingToUsername;
    userText.current.focus();
  }, [replyingToUsername]);

  const {
    personComment: {
      currentUser: { image },
    },
    submitReply,
  } = useGlobalState();

  return (
    <div className="comment__textbox__container">
      <img src={`${image.webp}`} alt="user" className="avatar" />

      <textarea name="comment_reply" id="comment_box" ref={userText} />

      <button
        className="textbox__reply_btn"
        onClick={() =>
          submitReply(
            userText,
            replyingToUsername,
            id,
            type,
            index,
            setIsReplyBtnClicked
          )
        }
      >
        {text === "reply" ? (
          <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
            <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" />
          </svg>
        ) : null}
        {text}
      </button>
    </div>
  );
};

export default CommentTextbox;
