import React from "react";
import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";
import Stories from "../components/Stories";
import Addpost from "../components/Addpost";
import Feed from "../components/Feed";

const Homepage = () => {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[22%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <Stories />
          <Addpost />
          <Feed />
        </div>
      </div>
      <div className="hidden xl:block w-[28%]">
        <RightMenu />
      </div>
    </div>
  );
};

export default Homepage;
