import { useState, useRef, useEffect } from "react";
import { UPDATE } from "../action";
//component
import Score from "./Score";
import CommentTextbox from "./CommentTextbox";
import DeleteCommentModalBox from "./DeleteCommentModalBox";
// icons
import replyIcon from "../icons/icon-reply.svg";
import deleteIcon from "../icons/icon-delete.svg";
import editIcon from "../icons/icon-edit.svg";
import { useGlobalState } from "../context";

const Comment = ({
  id,
  type,
  user,
  currentUser,
  createdAt,
  content,
  score,
  replyingTo,
  index,
}) => {
  const [edit, setEdit] = useState(false);
  const [IsReplyBtnClicked, setIsReplyBtnClicked] = useState(false);
  const editText = useRef(null);
  const [openDeleteModalBox, setOpenDeleteModalBox] = useState(false);
  const { dispatch } = useGlobalState();

  const {
    image: { webp },
    username,
  } = user;

  useEffect(() => {
    if (edit) {
      editText.current.value = content;
      editText?.current.focus();
    }
  }, [edit, content]);

  //   remember to refactor
  const hideReplyBoxOnOutsideEventClick = (event) => {
    const selectedEvent = event.target.closest(".comment-reply__btn");
    const replyBox = event.target.closest(".comment__textbox__container");
    const editBox = event.target.closest(".comment_edit");
    const editBtn = event.target.closest(".comment__edit");

    if (!selectedEvent && !replyBox && !editBox && !editBtn) {
      setIsReplyBtnClicked(false);
      setEdit(false);
    }
  };

  // function to edit
  const updateEditedComment = () => {
    const editedText = editText.current.value;
    dispatch({ type: UPDATE, payload: { type, id, index, editedText } });
    // close edit textarea after update
    setEdit(false);
  };

  return (
    <article className="comments" onClick={hideReplyBoxOnOutsideEventClick}>
      <div className="comment__center">
        {/* user info */}
        <div className="comment__user_info">
          <img src={webp} alt="user" className="avatar" />
          <h4>{username}</h4>
          {currentUser === username && <span>you</span>}
          <p>{createdAt}</p>
        </div>

        {/* comment message */}
        <div className="comment_msg">
          {edit ? (
            <div className="comment_edit">
              <textarea ref={editText}></textarea>
              <button className="update" onClick={() => updateEditedComment()}>
                update
              </button>
            </div>
          ) : (
            <p>{content}</p>
          )}
        </div>

        {/* score switch */}
        <div className="comment__score">
          <Score score={score} id={id} type={type} index={index} />
        </div>
        <div className="comment__btn">
          {currentUser === username ? (
            <>
              {/*edit and delete button*/}
              <button className="comment__edit" onClick={() => setEdit(true)}>
                <img src={editIcon} alt="edit comment" /> Edit
              </button>
              <button
                className="comment__delete"
                onClick={() => setOpenDeleteModalBox(true)}
              >
                <img src={deleteIcon} alt="delete comment" /> delete
              </button>
            </>
          ) : (
            // reply to comment
            <button
              className="comment-reply__btn"
              onClick={() => setIsReplyBtnClicked(true)}
            >
              <img src={replyIcon} alt="reply" />
              reply
            </button>
          )}
        </div>

        {/* comment textbox */}
      </div>
      {currentUser !== username && IsReplyBtnClicked && (
        <CommentTextbox
          id={id}
          user={username || replyingTo}
          text="reply"
          type={type}
          index={index}
          setIsReplyBtnClicked={setIsReplyBtnClicked}
        />
      )}
      {/* delete comment  */}
      {openDeleteModalBox && (
        <DeleteCommentModalBox
          id={id}
          type={type}
          index={index}
          setOpenDeleteModalBox={setOpenDeleteModalBox}
        />
      )}
    </article>
  );
};

export default Comment;
