import React from "react";
import "./FaceRecognizer.css";

const FaceRecognizer = ({ imageUrl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputimage" alt="" src={imageUrl} width="500px" height="auto" />
        <div className="bounding-box" style={{left: box.leftCol, right: box.rightCol, top: box.topRow, bottom: box.bottomRow}}></div>
      </div>
    </div>
  );
};

export default FaceRecognizer;