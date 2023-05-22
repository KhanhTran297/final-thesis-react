import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAccount from '@/hook/useAccount';
import useBookmark from '@/hook/useBookmark';
import Post from '../post/Post';

const Bookmark = () => {
    const selectorAccount = useSelector((state) => state.account);
    const selectorBookmark = useSelector((state) => state.bookmark);
    const { getProfileAccount } = useAccount();
    const {  setParams,getListBookmark } = useBookmark();
    const listBookmark = selectorBookmark.listBookmark;
    const userAccount = selectorAccount.account;

    
    getListBookmark();
    useEffect(() => {
        
        if (userAccount.id) {
            setParams(userAccount.id);
          }
        
    }, [userAccount]);
      
      

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className='w-[700px] flex  mt-11'>
                <p className='font-sans text-3xl font-semibold'>Bookmarked posts</p>
            </div>
            <div className='mt-3'>
                { listBookmark?.content?.map((bookmark) => {

                    return (
                        <Post
                        key={bookmark.postDto.id}
                        id={bookmark.postDto.id}
                        title={bookmark.postDto.titlePost}
                        content={bookmark.postDto.contentPost}
                        fullnameAccountPost={bookmark.postDto.accountPost.fullName}
                        avatarAccountPost={bookmark.postDto.accountPost.avatarPath}
                        emailAccountPost={bookmark.postDto.accountPost.email}
                        createdDate={bookmark.postDto.createdDate}
                        isBookmarked={true}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Bookmark;