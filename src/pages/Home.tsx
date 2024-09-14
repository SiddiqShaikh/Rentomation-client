import React from "react";
import { HomeInterfaceProps } from "../types/commonInterface";
import IntroComponent from "../sections/home/Intro";
import KnowAboutUs from "../sections/home/Knowaboutus";
// import PopularResidence from "../sections/home/Popularresidence";
import SearchRoom from "../sections/home/Searchroom";
const PopularResidence = React.lazy(
  () => import("../sections/home/Popularresidence")
);

const Home: React.FC<HomeInterfaceProps> = () => {
  return (
    <div className="w-full min-h-[100vh] relative">
      <div
        className="absolute inset-0 h-[800px] z-[1] opacity-85"
        style={{
          backgroundImage: `url(/images/home.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute inset-0 h-[800px] z-[2]"
        style={{
          backgroundImage: `url(/images/home-lg.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-[2]">
        <IntroComponent />
        <KnowAboutUs />
        <React.Suspense fallback={<>...</>}>
          <PopularResidence />
        </React.Suspense>
        <SearchRoom />
      </div>
    </div>
  );
};

export default Home;
