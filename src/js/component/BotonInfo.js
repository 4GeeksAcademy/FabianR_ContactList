import React from "react";

const BotonInfo = ({ clase, texto }) => {
  return (
    <div>
      <button className={`btn ${clase} w-100 m-3 mx-auto`}>{texto}</button>
    </div>
  );
};

export default BotonInfo;
