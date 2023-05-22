import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { atom, useRecoilState } from "recoil";
import useMyToast from "./useMyToast";
import {
  createBookmarkApi,
  deleteBookmarkApi,
  getListBookmarkApi,
} from "@/api/bookmark";
import { setListBookmark } from "@/redux/slice/bookmark";
import { useEffect } from "react";
const queryBookmarkParams = atom({
    key: "bookmarkParams", // unique ID (with respect to other atoms/selectors)
    default: "", // default value (aka initial value)
  });

function useBookmark() {
  const { useSuccess, useError } = useMyToast();
  const dispatch = useDispatch();
  const [params, setParams] = useRecoilState(queryBookmarkParams);


  const {
    data: listBookmark,
    refetch: getListBookmark,
    isLoading: loadingPage,
  } = useQuery({
    queryKey: ["listBookmark"],
    queryFn: () => getListBookmarkApi(params),
    enabled: false,
    retry: 0,
    onSuccess: (listBookmark) => {
      dispatch(setListBookmark(listBookmark.data));
    },
  });

  //addBookmark
  const { mutate: createBookmark } = useMutation({
    mutationFn: createBookmarkApi,
    onSuccess: (respone) => {
      if (respone.result) {
        getListBookmark();
        useSuccess("Add bookmark success");
      } else {
        useError("Add bookmark fail!");
      }
    },
    onError: () => {
      useError("Save fail!!!!");
    },
  });

  //deleteBookmark
  const { mutate: deleteBookmark } = useMutation({
    mutationFn: deleteBookmarkApi,
    onSuccess: (respone) => {
      if (respone.result) {
        getListBookmark();
        useSuccess("Delete bookmark success");
      } else {
        useError("Add bookmark fail!");
      }
    },
    onError: () => {
      useError("Delete fail!!!!");
    },
  });
  useEffect(() => {
    getListBookmark(params);
  }, [params]);
  return {
    listBookmark,
    getListBookmark,
    createBookmark,
    deleteBookmark,
    loadingPage,
    params,
    setParams,
  };
}

export default useBookmark;
