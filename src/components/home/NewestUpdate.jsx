import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import usePost from "@/hook/usePost";
import NewestUpdateMainPost from "./NewestUpdateMainPost";
import NewestUpdatePost from "./NewestUpdatePost";
const NewestUpdate = () => {
  const selectorPost = useSelector((state) => state.post);
  const { getListPost } = usePost();
  const listPost = selectorPost.listPost;
  
  

  const filteredListPost = listPost?.content
    ?.filter((post) => post.typePost === 1)
    ?.map((post) => ({
      ...post,
    }));

  useEffect(() => {
    getListPost();
  }, [listPost]);

  const reversedListPost = filteredListPost
    ? [...filteredListPost].reverse()
    : [];
  return (
    <div id="newestUpdate" className="grid grid-rows-[10%_90%] min-h-[1000px]">
      <div className="titleNewestUpdate text-[#3a1097] text-[28px] leading-9 font-semibold mt-[20px] mb-[20px] mr-[11px] ml-[11px] before:contents[''] before:absolute before:w-[50px] before:border-solid before:border-border_title before:border-t-[3px] ">
        Newest Update
      </div>
      <div className="postWrap grid grid-rows-[60%_40%]">
        <div className="topBoxContainer grid grid-cols-[auto_auto] ">
          <NewestUpdateMainPost
            url="https://img.freepik.com/free-photo/holding-hands_1112-1460.jpg?w=1380&t=st=1684571185~exp=1684571785~hmac=dd235f7538734f6f575ac63b74fb521e000b961888ff58dd8139188b2ff0225fZ"
            title={filteredListPost?.[0]?.titlePost}
            id={filteredListPost?.[0]?.id}
            fullName={filteredListPost?.[0]?.accountPost.fullName}
            createdDate={filteredListPost?.[0]?.createdDate}
          />
          <div className="rightContainer flex flex-col overflow-y-scroll bg-rightBox rounded-[10px] pl-[10px] pr-[10px] h-[500px] ">
            {reversedListPost?.slice(1, 6).map((post) => (
              <NewestUpdatePost
                url="https://img.freepik.com/free-vector/cute-baby-sleeping-cloud-pillow-cartoon-icon-illustration_138676-2812.jpg?w=1060&t=st=1684571107~exp=1684571707~hmac=e7971e1b17ed1d1edc241e6aba0000f9002bd783c54d1b254355b8a9a366dc3b"
                position="right"
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
        <div className="bottomboxContainer flex flex-row justify-between ">
          <NewestUpdatePost url="./img/newest/bottom/post1.jpg"></NewestUpdatePost>
          <NewestUpdatePost url="./img/newest/bottom/post2.jpg"></NewestUpdatePost>
          <NewestUpdatePost url="./img/newest/bottom/post3.jpg"></NewestUpdatePost>
          <NewestUpdatePost url="./img/newest/bottom/post4.jpg"></NewestUpdatePost>
        </div>
      </div>
    </div>
  );
};

export default NewestUpdate;
