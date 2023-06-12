import React, { useState } from "react";
import plusIcon from "../icons/icon-plus.svg";
import minusIcon from "../icons/icon-minus.svg";

import { useGlobalState } from "../context";

const Score = ({ score, id, type, index }) => {
  const { handleSwitch } = useGlobalState();
  const [liked, setIsLiked] = useState(false);

  return (
    <div className="score">
      <span
        onClick={() =>
          handleSwitch("increase", id, type, index, liked, setIsLiked)
        }
      >
        <img src={plusIcon} alt="increase score" />
      </span>
      <span className="score__text">{score}</span>
      <span
        onClick={() =>
          handleSwitch("decrease", id, type, index, liked, setIsLiked)
        }
      >
        <img src={minusIcon} alt="decrease score" />
      </span>
    </div>
  );
};

export default Score;
