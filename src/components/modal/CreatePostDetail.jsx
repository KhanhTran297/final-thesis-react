import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";

import usePost from "@/hook/usePost";
import { Input } from "../input";
import RichTextField from "../common/RichTextField";

const CreatePostDetail = (props) => {
  const { createPost, createPostLoading } = usePost();
  const { updatePost } = usePost();
  const [contentError, setContentError] = useState(false);

  const schema = yup.object({
    titlePost: yup
      .string()
      .required("This field is required")
      .max(200, "Post title should not exceed 200 characters"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      titlePost: props?.title ?? "",
      contentPost: props?.content ?? "",
    },
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const handleCreatePost = (value) => {
    const data = { ...value, typePost: 2 };
    createPost(data);
    reset();
    props.handleClose();
  };

  const handleUpdatePost = (id, value) => {
    const data = { ...value, id: id };
    updatePost(data);
    props.handleClose();
  };

  const onSubmit = (values) => {
    if (values.contentPost.trim() === "") {
      setContentError(true);
      return;
    }
    setContentError(false);
    const data = { ...values, typePost: 2 };
    props.isUpdate ? handleUpdatePost(props.id, data) : handleCreatePost(data);
  };

  if (typeof document === "undefined")
    return <div className="createpostdetal"></div>;
  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-5 createpostdetal ${
        props.open ? "" : "opacity-0 invisible"
      }`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-25 overlay"
        onClick={props.handleClose}
      ></div>
      <div className="relative z-10 w-full bg-white mb-5 modal-content max-w-[650px] h-[720px]">
        <div className=" w-[650px] h-[50px]  bg-slate-200 border border-3 border-solid border-gray-400">
          <div>
            <div className="pt-3  pl-6 pr-6 flex ">
              <span className="w-full text-lg font-medium  text-blue-500">
                {props.isUpdate
                  ? "Edit a post to share"
                  : "Create a post to share"}
              </span>
              <span
                className="absolute top-8 right-8 flex items-center justify-center w-10 h-10 p-1  cursor-pointer -translate-y-2/4 translate-x-2/4
                "
                onClick={props.handleClose}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.225 7L13.7375 1.4875C14.0875 1.1375 14.0875 0.6125 13.7375 0.2625C13.3875 -0.0875 12.8625 -0.0875 12.5125 0.2625L7 5.775L1.4875 0.2625C1.1375 -0.0875 0.6125 -0.0875 0.2625 0.2625C-0.0874998 0.6125 -0.0874998 1.1375 0.2625 1.4875L5.775 7L0.2625 12.5125C0.0875002 12.6875 0 12.8625 0 13.125C0 13.65 0.35 14 0.875 14C1.1375 14 1.3125 13.9125 1.4875 13.7375L7 8.225L12.5125 13.7375C12.6875 13.9125 12.8625 14 13.125 14C13.3875 14 13.5625 13.9125 13.7375 13.7375C14.0875 13.3875 14.0875 12.8625 13.7375 12.5125L8.225 7Z"
                    fill="#84878B"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="w-full ml-8  flex relative mt-10  z-0">
            <a
              href=""
              className="w-8 h-8 border-[1px] mt-2  border-solid border-blueborder relative rounded-full"
            >
              <span className="overflow-hidden h-[100%] w-[100%] block">
                <span className="pb-[100%] rounded-full"></span>
                <img
                  src={props.avatar}
                  alt=""
                  className="rounded-full absolute w-full h-full"
                />
              </span>
            </a>

            <span className=" pt-2 pl-3 text-base font-semibold">
              {props.fullname}
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} isloading={createPostLoading}>
            <div className="block ml-[5%]">
              <p className=" w-[100%] mt-[5%]  inline-block self-start text-sm font-medium cursor-pointer text-text2 dark:text-text3">
                Title Post
              </p>
              <Input
                control={control}
                name="titlePost"
                type="text"
                placeholder="Title post"
                error={errors.titlePost?.message}
                className="h-[45px] mr-5  mb-3 w-[95%] border-2  p-2 overflow-scroll font-semibold"
              />
            </div>
            <div className="block w-[90%] mt-6 mb-16 ml-[5%] h-[320px]">
              <p className="inline-block self-start text-sm font-medium cursor-pointer text-text2 dark:text-text3">
                Content Post
              </p>
              <RichTextField
                name="contentPost"
                value={getValues("contentPost")}
                onChange={(html) => setValue("contentPost", html)}
              />
            </div>
            {contentError && (
              <span className="absolute text-sm font-medium pointer-events-none text-error  bottom-6/4 left-1 error-input w-full ml-[5%] mt-4 ">
                This field is required
              </span>
            )}
            <Button
              className="w-[90%] ml-[5%] text-white mt-10 bg-blueborder"
              htmlType="submit"
              loading={createPostLoading}
            >
              {props.isUpdate ? "Edit Post" : "Create Post"}
            </Button>
          </form>
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default CreatePostDetail;
