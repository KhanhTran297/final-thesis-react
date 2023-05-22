import React from 'react';
import ReadMoreReadLess from './ReadMoreReadLess';

const BodyBoxComment = (props) => {
    return (
        <div className="flex flex-col ml-12">
            <ReadMoreReadLess limit={100}>{props.content}</ReadMoreReadLess>
            <div className=" text-left">
                <div className="flex items-center gap-6 opacity-60 mt-3 text-sm mb-3 group">
                    <div className=" cursor-pointer">{props.createdDate}</div>
                </div>
            </div>
        </div>
    );
};

export default BodyBoxComment;