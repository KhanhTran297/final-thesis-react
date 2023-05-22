import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import usePost from "@/hook/usePost";
import useAccount from "@/hook/useAccount";
import Post from "../post/Post";
import CreatePost from "./CreatePost";
import LeftSideForum from "./LeftSideForum";
import RightSideForum from "./RightSideForum";
import useBookmark from "@/hook/useBookmark";

const Forum = () => {
  const selectorAccount = useSelector((state) => state.account);
  const selectorBookmark = useSelector((state) => state.bookmark);
  const selectorPost = useSelector((state) => state.post);
  const { getListPost } = usePost();
  const { getProfileAccount } = useAccount();
  const {  setParams } = useBookmark();
  const listBookmark = selectorBookmark.listBookmark;
  const userAccount = selectorAccount.account;
  const listPost = selectorPost.listPost;
  
  const isBookmark = (postId) => {
    const bookmark = listBookmark?.content?.find(
      (bookmark) => bookmark.postDto.id === postId)
    return bookmark && true;
  } 

  const filteredListPost = listPost?.content
    ?.filter((post) => post.typePost === 2)
    ?.map((post) => ({
      ...post,
      isBookmarked: isBookmark(post.id),
    }));

  const reversedListPost = filteredListPost ? [...filteredListPost].reverse() : [];

  useEffect(() => {
    getListPost();
    getProfileAccount();
    setParams(userAccount.id);

  }, [listPost, userAccount, listBookmark]);

  return (
    <div className="grid grid-cols-[20%_60%_20%]">
      <LeftSideForum className="fixed"></LeftSideForum>
      <div className="mt-5 ml-2 mr-2  flex flex-col place-items-center ">
        <div className="mr-11 ml-11 mb-3 mt-3 w-[700px] h-[72px] rounded-lg bg-slate-200 border border-3 border-solid border-blue-600">
          <div className="pt-6 pb-4 pl-6 pr-6 flex ">
            <span className="w-full text-xl font-medium text-center text-blueborder">
              Discuss
            </span>
          </div>
        </div>
        <CreatePost
          avatar={userAccount?.userAvatar}
          fullname={userAccount?.userFullName}
        />
        <div className="mt-3">
          {reversedListPost?.map((post) => (
            
            <Post
              key={post.id}
              id={post.id}
              title={post.titlePost}
              content={post.contentPost}
              fullnameAccountPost={post.accountPost.fullName}
              avatarAccountPost={post.accountPost.avatarPath}
              emailAccountPost={post.accountPost.email}
              createdDate={post.createdDate}
              isBookmarked={post.isBookmarked}
            />
          ))}
        </div>
      </div>
      <RightSideForum />
    </div>
  );
};

export default Forum;
