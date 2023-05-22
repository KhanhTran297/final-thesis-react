import React from "react";
import {
  useMutation,
  useQuery,
} from "react-query";
import { useDispatch, useSelector } from "react-redux";
import useMyToast from "./useMyToast";
import { createPostApi, deletePostApi, getListPostApi, getPostApi, updatePostApi } from "@/api/post";
import { setListPost, setPostId } from "@/redux/slice/post";

function usePost() {
  const { useSuccess, useError } = useMyToast();
  const dispatch = useDispatch();
  const postId = useSelector((state) => state.post.postId);
  const page = useSelector((state) => state.post.page);

  //getListPost
  const {
    data: listPost,
    refetch: getListPost,
    isLoading: loadingPage,
  } = useQuery({
    queryKey: ["listPost"],
    queryFn:() => getListPostApi(),
    enabled: false,
    retry: 0,
    onSuccess: (listPost) => {
      dispatch(setListPost(listPost.data));
    },
  });

  // getPost
  const {
    data: post,
    refetch: getPost,
    isLoading: loadingPost,
  } = useQuery(["post", postId], () => getPostApi(postId), {
    enabled: false,
    retry: 0,
    onSuccess: (post) => {
      dispatch(setPostId(post.data));
    },
  });

  //createPost
  const { mutate: createPost , isLoading: createPostLoading} = useMutation({
    mutationFn: createPostApi,
    onSuccess: (respone) => {
        if (respone.result) {
          getListPost();
          
          useSuccess("Create post success!");
        } else {
          useError("Create post fail!");
        }
    },
    onError: () => {
      useError("Save fail!!!!");
    },
  });
  
  //deletePost
  const {mutate: deletePost} = useMutation({
    mutationFn: deletePostApi,
    onSuccess: (respone) => {
        if (respone.result) {
          getListPost();
          useSuccess("Delete post success!");
        } else {
          useError("Delete post fail!");
        }
      },
      onError: () => {
        useError("Save fail!!!!");
      },
  });

  //editPost
  const {mutate: updatePost} = useMutation({
    mutationFn: updatePostApi,
    onSuccess: (respone) => {
        if (respone.result) {
          getListPost();
          useSuccess("Update post success!");
        } else {
          useError("Update post fail!");
        }
      },
      onError: () => {
        useError("Save fail!!!!");
      },
  });

  return {
    listPost,
    getListPost,
    loadingPage,
    updatePost,
    deletePost,
    createPost,
    createPostLoading,
    getPost,
    post,
  };
}

export default usePost;
