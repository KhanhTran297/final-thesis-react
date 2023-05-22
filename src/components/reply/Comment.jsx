import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import BoxComment from "./BoxComment";
import CreateComment from "../post/CreateComment";

const Comment = (props) => {
  const [commentData, setCommentData] = useState();
  const { data, postId, css, permission, accountId } = props;
  const [showReply, setShowReply] = useState({});
  const [showChildComment, setShowChildComment] = useState(false);

  const schema = yup.object({
    contentComment: yup
      .string()
      .max(50, "Content should not exceed 100 characters"),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const renderChildComment = (parentId) => {
    setShowChildComment((prev) => !prev);
    const obj = { postId: postId.toString(), parentId: parentId.toString() };
    const params = new URLSearchParams();
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== undefined && obj[key] !== "") {
        params.set(key, obj[key]);
      }
    });
    const url = `https://accompanyingparents-production.up.railway.app/v1/comment/list?${params}`;
    fetch(url)
      .then((response) => response.json())
      .then((responedata) => {
        // handle the response data
        setCommentData((state) => (state = responedata.data.content));
      })
      .catch((error) => {
        // handle errors
      });
  };
  const toggleReply = (commentId) => {
    renderChildComment(commentId);
    setShowReply((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };
  return (
    <div>
      <div className={`mt-3 ${css}`}>
        {data?.map((comment) => (
          <div key={comment.id}>
            <BoxComment
              id={comment.id}
              content={comment.contentComment}
              fullname={comment.accountComment.fullName}
              avatar={comment.accountComment.avatarPath}
              email={comment.accountComment.email}
              createdDate={comment.createdDate}
              permission={permission}
            />
            <div className=" flex ">
              <button
                className="hover:text-blue-500 cursor-pointer"
                onClick={() => toggleReply(comment.id)}
              >
                {showReply[comment.id] ? "Hide reply" : "Reply"}
              </button>
              {comment.hasChild && (
                <button
                  onClick={() => renderChildComment(comment.id)}
                  className=" hover:text-blue-500 cursor-pointer ml-2"
                >
                  {showChildComment ? "Hide" : "Read more"}
                </button>
              )}
            </div>
            {showReply[comment.id] ? (
              <CreateComment
                postId={postId}
                parentId={comment.id}
                data={commentData}
              />
            ) : (
              ""
            )}
            {showChildComment && comment.hasChild ? (
              <Comment
                data={commentData}
                postId={postId}
                parentId={comment.id}
                accountId={accountId}
                permission={permission}
                css=" ml-7"
              />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
