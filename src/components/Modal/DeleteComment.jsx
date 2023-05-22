import React from "react";
import { Button, Modal } from "antd";
import useComment from "@/hook/useComment";
const DeleteComment = (props) => {
  const { open, handleClose, commentId } = props;
  const { deleteComment } = useComment();
  return (
    <div>
      <Modal
        open={open}
        title="Warning"
        onOk={handleClose}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose}>
            No
          </Button>,
          <Button
            key="back"
            type="default"
            onClick={() => deleteComment(commentId)}
          >
            Yes
          </Button>,
        ]}
      >
        <p>Are you sure!!!!!!</p>
      </Modal>
    </div>
  );
};

export default DeleteComment;
