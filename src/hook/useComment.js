import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import {
  createCommentApi,
  deleteCommentApi,
  getListCommentApi,
  updateCommentApi,
} from "@/api/comment";
import { setListComment } from "@/redux/slice/comment";
import useMyToast from "./useMyToast";

function useComment() {
  const { useSuccess, useError } = useMyToast();
  const dispatch = useDispatch();
  //getListcomment
  const {
    data: listComment,
    refetch: getListComment,
    isLoading: loadingPage,
  } = useQuery({
    queryKey: ["listComment"],
    queryFn: () => getListCommentApi(),
    enabled: false,
    retry: 0,
    onSuccess: (listComment) => {
      dispatch(setListComment(listComment.data));
    },
    onError: () => {
      console.log("Error");
    },
  });

  //createcomment
  const { mutate: createComment, isLoading: createCommentLoading } =
    useMutation({
      mutationFn: createCommentApi,
      onSuccess: (respone) => {
        if (respone.result) {
          getListComment();

          useSuccess("Create comment success!");
        } else {
          useError("Create comment fail!");
        }
      },
      onError: () => {
        useError("Save fail!!!!");
      },
    });

  //deletecomment
  const { mutate: deleteComment } = useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: (respone) => {
      if (respone.result) {
        getListComment();
        useSuccess("Delete comment success!");
      } else {
        useError("Delete comment fail!");
      }
    },
    onError: () => {
      useError("Save fail!!!!");
    },
  });

  //editcomment
  const { mutate: updateComment } = useMutation({
    mutationFn: updateCommentApi,
    onSuccess: (respone) => {
      if (respone.result) {
        getListComment();
        useSuccess("Update comment success!");
      } else {
        useError("Update comment fail!");
      }
    },
    onError: () => {
      useError("Save fail!!!!");
    },
  });
  return {
    listComment,
    getListComment,
    loadingPage,
    updateComment,
    deleteComment,
    createComment,
    createCommentLoading,
  };
}
export default useComment;
