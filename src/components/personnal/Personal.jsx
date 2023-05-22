import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import usePost from "@/hook/usePost";
import useAccount from "@/hook/useAccount";
import CreatePost from "../forum/CreatePost";
import Post from "../post/Post";
import HeaderPersonal from "./HeaderPersonal";

const Personal = () => {
  //hooks
  const selectorAccount = useSelector((state) => state.account);
  const selectorPost = useSelector((state) => state.post);
  const { getListPost } = usePost();
  const { getProfileAccount } = useAccount();
  //variables
  const userAccount = selectorAccount.account;
  const listPost = selectorPost.listPost;

  useEffect(() => {
    getListPost();
    getProfileAccount();
  }, [listPost, userAccount]);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="ml-2 mr-2  flex flex-col place-items-center justify-center w-full">
        <HeaderPersonal />
        <CreatePost
          avatar={userAccount?.userAvatar}
          fullname={userAccount?.userFullName}
        />
        <div className="mt-3">
          {listPost?.content?.map((post) => {
            if (post.accountPost.email === userAccount.userEmail) {
              return (
                <Post
                  id={post.id}
                  title={post.titlePost}
                  content={post.contentPost}
                  usernameAccountPost={post.accountPost.fullName}
                  avatarAccountPost={post.accountPost.avatarPath}
                  emailAccountPost={post.accountPost.email}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Personal;
