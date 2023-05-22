import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useComment from "@/hook/useComment";
import { yupResolver } from "@hookform/resolvers/yup";
import Textarea from "@/textarea/Textarea";
const CreateComment = (props) => {
  const { postId, parentId, data } = props;
  const { createComment } = useComment();
  const handleCreateComment = (postId, value) => {
    const data = { ...value, postId: postId, parentId: parentId };
    createComment(data);
    // reset()
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // prevent the default behavior of textarea
      handleSubmit((value) => handleCreateComment(postId, value))();
      reset()
    }
  };
  const schema = yup.object({
    contentComment: yup
      .string()
      .max(500, "Content should not exceed 100 characters"),
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
  return (
    <div>
      <div className="border-b-[0.5px] border-solid p-2 border-gray-400">
        <i className="font-bold">
          {data?.length}
          {data?.length > 1 ? " comments" : " comment"}
        </i>
      </div>
      <form onSubmit={handleSubmit(handleCreateComment)}>
        <div className=" mt-3 relative ">
          <Textarea
            control={control}
            name="contentComment"
            type="text"
            placeholder="Content comment"
            error={errors.contentComment?.message}
            onKeyDown={handleKeyDown}
            className=" mr-5  mb-3 w-[100%] border-2  p-2 overflow-scroll font-semibold"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
