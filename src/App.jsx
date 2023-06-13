import React from "react";
import Comments from "./components/Comments";
import { useGlobalState } from "./context";
import CommentTextbox from "./components/CommentTextbox";

const App = () => {
  const { personComment } = useGlobalState();

  if (personComment.length === 0)
    return (
      <div className="loading__container">
        <h2>Loading...</h2>
      </div>
    );

  const {
    comments,
    currentUser: { username },
  } = personComment;

  return (
    <section>
      <div className="container">
        {comments.map((comment, index) => {
          return (
            <Comments
              key={comment.id}
              {...comment}
              currentUser={username}
              index={index}
            />
          );
        })}
        <div className="text__box">
          <CommentTextbox text="Send" type="send" />
        </div>
      </div>
    </section>
  );
};

export default App;
