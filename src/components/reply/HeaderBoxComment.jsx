import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Dropdown, Space } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import DeleteComment from "../Modal/DeleteComment";
import Report from "../Modal/Report";
import EditComment from "../Modal/EditComment";
const HeaderBoxComment = (props) => {
  const { permission, id, email, content } = props;
  const selectorAccount = useSelector((state) => state.account);
  const userAccount = selectorAccount.account;
  const [showReport, setShowReport] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const items = [
    email !== userAccount.userEmail && {
      label: <p onClick={() => setShowReport(true)}>Report</p>,
      key: "0",
    },
    (permission || email == userAccount.userEmail) && {
      label: <p onClick={() => setShowDelete(true)}>Delete</p>,
      key: "1",
    },
    email == userAccount.userEmail && {
      label: <p onClick={() => setShowEdit(true)}>Edit</p>,
      key: "2",
    },
  ];
  return (
    <div className=" relative">
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
        className=" absolute right-0"
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <MoreOutlined size={40} className=" cursor-pointer" />
          </Space>
        </a>
      </Dropdown>
      <div className="relative z-0 ">
        <Report open={showReport} handleClose={() => setShowReport(false)} />
      </div>
      <div className="relative z-0 ">
        <DeleteComment
          open={showDelete}
          handleClose={() => setShowDelete(false)}
          commentId={id}
        />
      </div>
      <div className="relative z-0 ">
        <EditComment
          open={showEdit}
          handleClose={() => setShowEdit(false)}
          commentId={id}
          contentComment={content}
        />
      </div>
      <div className=" h-full    bg-gray-200  rounded-full solid mr-1 ">
        <div className="flex">
          <a href="">
            <img src={props.avatar} alt="" className="rounded-full w-9 h-9" />
          </a>
          <span className="pl-3 mb-3 #0f172a">
            <a href="">
              <b>{props.fullname}</b>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderBoxComment;
