import React, { useEffect } from "react";
import Features from "./Features";
import NewestUpdate from "./NewestUpdate";
import Question from "./Question";
import Slider from "./Slider";

const Home = () => {

  return (
    <div className="m-8 ml-2 mr-2">
      <Slider/>
      <Features/>
      <NewestUpdate/>
      <Question/>
    </div>
  );
};

export default Home;
