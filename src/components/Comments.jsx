import Comment from "./Comment";

const Comments = ({
  id,
  content,
  createdAt,
  replies,
  score,
  user,
  currentUser,
  index,
}) => {
  return (
    <div className="comment">
      <Comment
        id={id}
        content={content}
        createdAt={createdAt}
        score={score}
        user={user}
        currentUser={currentUser}
        type="comment"
        index={index}
      />
      <div className="replies">
        {replies?.map((reply) => (
          <Comment
            key={reply.id}
            {...reply}
            currentUser={currentUser}
            type="replies"
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
