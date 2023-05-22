import { Button, Form, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useRef } from "react";
import useComment from "@/hook/useComment";
const EditComment = (props) => {
  const { commentId, handleClose, open, contentComment } = props;
  const { updateComment } = useComment();
  const formRef = useRef();
  const onSubmit = (value) => {
    const data = { ...value, id: commentId };
    updateComment(data);
    handleClose();
  };
  const handleEdit = () => {
    formRef.current?.submit();
  };
  return (
    <div>
      <Modal
        open={open}
        title="Edit comment"
        onOk={handleClose}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose}>
            back
          </Button>,
          <Button key="submit" type="default" onClick={handleEdit}>
            Edit
          </Button>,
        ]}
      >
        <Form onFinish={onSubmit} ref={formRef}>
          <Form.Item
            name="contentComment"
            label="Content"
            rules={[
              {
                message: { contentComment },
              },
            ]}
          >
            <TextArea placeholder={contentComment}></TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditComment;
