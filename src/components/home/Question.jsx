import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import usePost from "@/hook/usePost";
import QuestionBox from "./QuestionBox";


const Question = () => {
  const selectorPost = useSelector((state) => state.post);
  const { getListPost } = usePost();
  const listPost = selectorPost.listPost;
  const navigate = useNavigate();


  const filteredListPost = listPost?.content
    ?.filter((post) => post.typePost === 2)
    ?.map((post) => ({
      ...post,
    }));
  
    useEffect(() => {
      getListPost();
  
    }, [listPost]);
  
  const reversedListPost = filteredListPost ? [...filteredListPost].reverse() : [];
  return (
    <div id="question" className="grid grid-row-[auto_auto] mt-10">
      <div className="titleQuestions text-[#3a1097] text-[28px] leading-9 font-semibold mt-[20px] mb-[20px] mr-[11px] ml-[11px] before:contents[''] before:absolute before:w-[50px] before:border-solid before:border-border_title before:border-t-[3px]">
        Questions need your help
      </div>
      <div className="questionsContainer flex flex-col pl-3 pr-3">
        {reversedListPost?.slice(0,2 ).map((post) => (
                <QuestionBox 
                  position="right"
                  key={post.id}
                  id={post.id}
                  title={post.titlePost}
                  content={post.contentPost}
                  fullname={post.accountPost.fullName}
                  avatar={post.accountPost.avatarPath}
                  emailAccountPost={post.accountPost.email}
                  createdDate={post.createdDate}
                  isBookmarked={post.isBookmarked}
                />
  
          ))}
      </div>
      <div className="readMoreBox flex justify-center items-center pt-7 pb-7">
        <button className="readMorebtn text-[24px] font-bold leading-[33px] text-black pt-[10px] pb-[10px] pl-5 pr-5 bg-white cursor-pointer hover:text-[#3a1097]">
          <Link
            to="/forum"
            className=" no-underline text-black text-18 cursor-pointer hover:text-userOptions font-semibold"
          >
            Read More
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Question;
