import React, { useState } from "react";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";
import ReactCardFlip from "react-card-flip";

const FlipCard = ({ student }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <FrontCard handleClick={handleClick} student={student} />
      <BackCard handleClick={handleClick} student={student} />
    </ReactCardFlip>
  );
};

export default FlipCard;
