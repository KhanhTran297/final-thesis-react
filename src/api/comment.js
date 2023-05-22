import useCallApi from "@/hook/useCallApi";

const { useGet, usePost, useEdit, useDelete } = useCallApi();

export const getListCommentApi = () => {
  const url = "/v1/comment/list";
  return useGet({ url });
};

export const createCommentApi = (params) => {
  const url = "/v1/comment/create";
  return usePost({ url, requiredToken: true, params });
};

export const deleteCommentApi = (id) => {
  const url = `/v1/comment/delete/${id}`;
  return useDelete({ url, requiredToken: true });
};

export const updateCommentApi = (params) => {
  const url = "/v1/comment/update";
  return useEdit({ url, requiredToken: true, params });
};
