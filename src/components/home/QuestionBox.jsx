import React from "react";
import { Link } from "react-router-dom";
import ReadMoreReadLess from "../post/ReadMoreReadLess";

const QuestionBox = (props) => {
  return (
    <div className="questionBox grid grid-rows-[auto_auto] border-b-[0.5px] border-solid border-[#ccc] pt-[10px] pb-[10px]">
      <div className="userBox flex flex-row items-center relative ">
        <div className="userAva w-10 h-10 rounded-full border-[1px] border-solid border-[#ccc]">
          <img src={props.avatar} alt="" className="w-full h-full rounded-full" />
        </div>
        <div className="userName pl-[20px] font-bold text-[14px] leading-6 tracking-[-0.2px] text-black cursor-pointer hover:text-userOptions">
          {props.fullname}
        </div>
        <div className="date absolute right-0 font-semibold text-[14px] leading-6 tracking-[-0.2px] text-[#52575c]">
          {props.createdDate}
        </div>
      </div>
      <div className="contentBox pt-3 pb-3">
        <Link className="text-[18px] font-semibold hover:text-[#3a1097]">
          {props.title}
        </Link>
        <ReadMoreReadLess limit={100} className=" text-[13px] font-semibold leading-4 text-[#52575c]">
          {props.content}
        </ReadMoreReadLess>
      </div>
    </div>
  );
};

export default QuestionBox;
