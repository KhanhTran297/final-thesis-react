import React, { useEffect }  from "react";
import { useSelector } from "react-redux";
import usePost from "@/hook/usePost";
import FeaturePost from "./FeaturePost";
const Features = () => {
  const selectorPost = useSelector((state) => state.post);
  const { getListPost } = usePost();
  const listPost = selectorPost.listPost;

  const filteredListPost = listPost?.content
    ?.filter((post) => post.typePost === 1)
    ?.map((post) => ({
      ...post,
    }));
  
    useEffect(() => {
      getListPost();
  
    }, [listPost]);
  
  const reversedListPost = filteredListPost ? [...filteredListPost].reverse() : [];
  return (
    <div id="features" className=" grid grid-rows-[auto_auto]">
      <div className="titleFeatures text-userOptions text-[28px] leading-9 font-semibold mt-5 mr-[11px] mb-5 ml-[11px] before:content-[''] before:border-t-[3px] before:absolute before:w-[50px] before:border-solid before:border-border_title">
        Feature
      </div>
      <div className="boxItems grid grid-cols-[auto_auto_auto]">
        <FeaturePost></FeaturePost>
        <FeaturePost></FeaturePost>
        <FeaturePost></FeaturePost>
      </div>
    </div>
  );
};

export default Features;
