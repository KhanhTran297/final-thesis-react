import React from "react";
import { useSelector } from "react-redux";
import ReadMoreReadLess from "./ReadMoreReadLess";
import CreateComment from "./CreateComment";
import Comment from "../reply/Comment";
const BodyPost = (props) => {
  const selectorComment = useSelector((state) => state.comment);
  const selectorAccount = useSelector((state) => state.account);
  const profileAccount = selectorAccount.account;
  const listComment = selectorComment.listComment;
  const filteredListComment = listComment?.content?.filter(
    (comment) => comment.postComment.id === props.id
  );
  return (
    <div className="pt-7 pb-7 w-full">
      <div className="text-2xl font-semibold">{props.title}</div>
      <ReadMoreReadLess limit={500}>{props.content}</ReadMoreReadLess>
      <CreateComment
        postId={props.id}
        data={filteredListComment}
        parentId={""}
      />
      <Comment
        data={filteredListComment}
        postId={props.id}
        parentId={""}
        permission={
          profileAccount?.userEmail == props.emailAccountPost ? true : false
        }
        accountId={profileAccount?.id}
      />
    </div>
  );
};

export default BodyPost;
