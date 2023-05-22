import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostApi } from '@/api/post';
import Post from '@/components/post/Post';
import {  setPostId } from "@/redux/slice/post";
import { useQuery } from 'react-query';

const PostDetail = () => {
    const {postId} = useParams()
    const selectorBookmark = useSelector((state) => state.bookmark);
    const listBookmark = selectorBookmark.listBookmark;
    const dispatch = useDispatch();
    

    const isBookmark = (postId) => {
        const bookmark = listBookmark?.content?.find(
          (bookmark) => bookmark.postDto.id === postId)
        return bookmark && true;
      } 

    const {
    data: post,
    refetch: getPost,
    isLoading: loadingPost,
    } = useQuery(["post", postId], () => getPostApi(postId), {
        enabled: true,
        retry: 0,
        onSuccess: (post) => {
        dispatch(setPostId(post.data));
        },
    });

    return (
         <div className='justify-center flex mt-6'>
                {post?.data  ? (
                    <Post
                    key={post.data.id}
                    id={post.data.id}
                    title={post.data.titlePost}
                    content={post.data.contentPost}
                    fullnameAccountPost={post.data.accountPost.fullName}
                    avatarAccountPost={post.data.accountPost.avatarPath}
                    emailAccountPost={post.data.accountPost.email}
                    createdDate={post.data.createdDate}
                    isBookmarked={isBookmark(post.data.id)}
                    />
                ) : (
                    <p>Loading...</p>
                )}
    </div>
    );
};

export default PostDetail;