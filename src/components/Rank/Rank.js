import React, { useEffect } from "react";

const Rank = ({name, entries}) => {
  // useEffect(() => {
  //   console.log(entries);
  // }, [entries]);
  
  return (
    <div>
        <div className="white f3 ">
            {`${name} your current rank is...`}
        </div>
        <div className="white f1">
            {`${entries}`}
        </div>
    </div>
  );
};


export default Rank;