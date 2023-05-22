import React from "react";
import HeaderBoxComment from "./HeaderBoxComment";
import BodyBoxComment from "./BodyBoxComment";

const BoxComment = (props) => {
  return (
    <div className="mt-4 ml-3">
      <HeaderBoxComment {...props} />
      <BodyBoxComment {...props} />
    </div>
  );
};

export default BoxComment;
