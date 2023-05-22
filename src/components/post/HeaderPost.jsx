import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from 'antd';
import {
  BookOutlined,
  BookFilled
} from '@ant-design/icons';
import useAccount from "@/hook/useAccount";
import useCookie from "@/hook/useCookie";
import useClickOutSide from "@/hook/useClickOutSide";
import CreatePostDetail from "../Modal/CreatePostDetail";
import Report from "../Modal/Report";
import useBookmark from "@/hook/useBookmark";

const HeaderPost = (props) => {
  const selectorAccount = useSelector((state) => state.account);
  const selectorBookmark = useSelector((state) => state.bookmark);
  const listBookmark = selectorBookmark.listBookmark;
  const userAccount = selectorAccount.account;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { show, setShow, nodeRef } = useClickOutSide();
  const [showReport, setShowReport] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { isLoggedIn } = useCookie();
  const { getProfileAccount } = useAccount();
  const navigate = useNavigate();
  const {  setParams } = useBookmark();

  
  //methods
  const checkAccount = () => {
    if (isLoggedIn()) {
      if (!userAccount) {
        getProfileAccount();
      } else {
        setShowCreatePost(true);
      }
    } else {
      navigate("/login");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {

    if (userAccount.id) {
      setParams(userAccount.id);
    }

  }, [listBookmark, props.isBookmarked]);

  
  return (
    <Fragment>
      <div className="relative z-0">
        <Report
          {...props}
          open={showReport}
          handleClose={() => setShowReport(false)}
        />
      </div>
      <div className="relative z-0">
        <CreatePostDetail
          {...props}
          avatar={userAccount?.userAvatar}
          fullname={userAccount?.userFullName}
          open={showCreatePost}
          handleClose={() => setShowCreatePost(false)}
          isUpdate={true}
        />
      </div>
      <div className="w-full  flex  h-8 ">
        <div className=" w-[90%] flex gap-4">
          <a
            href=""
            className="w-8 h-8 border-[1px] mt-2  border-solid border-blueborder relative rounded-full"
          >
            <span className="overflow-hidden h-[100%] w-[100%] block">
              <span className="pb-[100%] rounded-full"></span>
              <img
                src={props.avatarAccountPost}
                alt=""
                className="rounded-full absolute w-full h-full"
              />
            </span>
          </a>

          <div className="flex flex-col">
            <span className="text-base font-semibold  ">
              {props.fullnameAccountPost}
            </span>
            <span className="text-base font-normal text-slate-400  h-[100%]">
              {props.createdDate}
            </span>
          </div>
        </div>

        <div className="items-center w-[10%] " ref={nodeRef}>
          <div>
            <button onClick={() => setShow(!show)}>
              <svg
                fill="#000000"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g data-name="Layer 2">
                    {" "}
                    <g data-name="more-vertical">
                      {" "}
                      <rect
                        width="24"
                        height="24"
                        transform="rotate(-90 12 12)"
                        opacity="0"
                      ></rect>{" "}
                      <circle cx="12" cy="12" r="2"></circle>{" "}
                      <circle cx="12" cy="5" r="2"></circle>{" "}
                      <circle cx="12" cy="19" r="2"></circle>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </button>

            {show && userAccount.userEmail !== props.emailAccountPost && (
              <div className="absolute w-25 h-22 z-10 translate-x-0 translate-y-2 bg-white border   shadow-lg ">
                <button
                  className="w-full h-8  border border-t-1 border-solid cursor-pointer text-left pl-1 pr-1 flex "
                  onClick={setShowReport}
                >
                  Report
                </button>
                <button className="w-full h-8  border border-t-1 border-solid cursor-pointer text-left pl-1 pr-1 flex "
                  onClick={ props.isBookmarked ? props.onDeleteBookmark : props.onBookmark }
                >
                  <span className="flex">
                    {props.isBookmarked ?  <BookFilled className="pt-1"/> : <BookOutlined className="pt-1"/> }
                    <span>Bookmark</span>

                  </span>
                </button>
              </div>
            )}
            {show && userAccount.userEmail === props.emailAccountPost && (
              <div
                type="primary"
                className="absolute w-25 h-22 z-10 translate-x-0 translate-y-2 bg-white border   shadow-lg "
              >
                <button
                  className="w-full h-8 block border  border-solid cursor-pointer text-left pl-1 pr-1"
                  onClick={checkAccount}
                >
                  Edit
                </button>

                <button
                  className="w-full h-8  border border-t-1 border-solid cursor-pointer text-left pl-1 pr-1 flex "
                  onClick={showModal}
                >
                  Delete
                </button>
                <Modal
                  title="Confirm delete"
                  open={isModalVisible}
                  onOk={props.onDelete}
                  onCancel={handleCancel}
                  okText="Delete"
                  okType="danger"
                >
                  <p>Are you sure you want to delete this post??</p>
                </Modal>
              </div>
            )}
            {!show && ""}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HeaderPost;
