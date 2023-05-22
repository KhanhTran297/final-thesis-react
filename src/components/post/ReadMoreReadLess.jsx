import React, { useRef, useState } from "react";

const ReadMoreReadLess = ({ children, limit }) => {
  const [isReadMoreShown, setReadMoreShown] = useState(false);
  const readmorebtnRef = useRef(null);
  const toggleBtn = () => {
    setReadMoreShown((prevState) => !prevState);
    readmorebtnRef.current.style.display = "none";
  };

  let content;
  if (isReadMoreShown) {
    content = children;
  } else {
    content = children.length > limit ? children.slice(0, limit) + "..." : children;
  }

  return (
    <div>
      <div className="read-more-read-less" dangerouslySetInnerHTML={{ __html: content }}></div>
      <button onClick={toggleBtn} ref={readmorebtnRef} className="opacity-60">
        {children && children.length > limit && !isReadMoreShown ? "Đọc thêm" : ""}
      </button>
    </div>
  );
};

export default ReadMoreReadLess;