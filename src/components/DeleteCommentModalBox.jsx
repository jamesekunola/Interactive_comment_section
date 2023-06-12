import { useGlobalState } from "../context";

const DeleteCommentModalBox = ({ id, type, index, setOpenDeleteModalBox }) => {
  const { deleteComment } = useGlobalState();

  return (
    <>
      <div className="delete__comment__wrapper">
        <h3>Delete comment</h3>
        <p>
          Are you sure you want to remove this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="delete__verification__btns">
          <button
            className="btn cancel"
            onClick={() => setOpenDeleteModalBox(false)}
          >
            No, cancel
          </button>
          <button
            className="btn delete"
            onClick={() => deleteComment(id, type, index)}
          >
            yes, delete
          </button>
        </div>
      </div>

      <div className="overlay"></div>
    </>
  );
};

export default DeleteCommentModalBox;
