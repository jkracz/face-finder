import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";
import faceLogo from "./face-find-96.png";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt shadow2"
        style={{ height: "150px", width: "150px" }}
      >
        <div className="pa3">
          <img style={{ paddingTop: "10px" }} alt="logo" src={faceLogo} />
        </div>
      </Tilt>
    </div>

    // <Tilt>
    //   <div style={{ height: "300px", width: '300px', backgroundColor: "darkgreen" }}>
    //     <h1>React Parallax Tilt 👀</h1>
    //   </div>
    // </Tilt>
  );
};

export default Logo;
