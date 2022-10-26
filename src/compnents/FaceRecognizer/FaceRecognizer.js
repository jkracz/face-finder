import React from "react";

const FaceRecognizer = ({ imageUrl }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img alt="face detected image" className="" src={imageUrl} width="500px" height="auto" />
      </div>
    </div>
  );
};

export default FaceRecognizer;