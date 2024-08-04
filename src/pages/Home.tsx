import React from "react";
import Masonry from "react-responsive-masonry";

import Button from "../components/Button";
import Container from "../components/Container";
import { HomeInterfaceProps } from "../types/commonInterface";

// import { useNavigate } from "react-router-dom";
// import HowItWorksCard from "../components/cards/HowItWorksCard";
// import { howItWorks } from "../utils/mock";
import Input from "../components/Input";

const Home: React.FC<HomeInterfaceProps> = () => {
  return (
    <div className="w-full min-h-[100vh] relative">
      <div
        className="absolute inset-0 h-[800px] z-[1]"
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
        <SearchRoom />
        {/* <KnowAboutUs />
        <HowItWork />
        <PopularResidence /> */}
      </div>
    </div>
  );
};

export default Home;

const IntroComponent = () => {
  return (
    <Container>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-center items-center text-white h-[800px]">
        <div className="lg:flex-1 px-2 lg:text-start text-center">
          <div className="w-full max-w-[550px] font-bold text-5xl">
            Find your next and most affortable perfect place to live
          </div>
        </div>
        <div className="lg:flex-1 w-full  px-2 md:px-0">
          <div className="max-w-[500px] w-full mx-auto flex ">
            <Input
              placeholder="Search"
              containerClass=" flex-1 !rounded-r-none rounded-md border border-white border-r-0 "
              inputClass="placeholder-white "
            />
            <Button
              label="Search"
              className="max-w-[100px] inline-flex justify-center !rounded-l-none rounded-md py-2"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

const SearchRoom = () => {
  return (
    <Container>
      <div className="flex flex-col-reverse lg:flex-row my-28 gap-y-4">
        {/* images container */}
        <div className="flex-1">
          <Masonry columnsCount={2} gutter="10px">
            <div className="relative">
              <img
                // key={i}
                src="/images/showroom4.png"
                style={{ width: "100%", display: "block" }}
                alt=""
              />
              <div className="absolute top-7 text-white w-full  ">
                <div className="w-full max-w-[268px] text-center mx-auto text-xl sm:text-2xl md:text-4xl  font-semibold">
                  Flexible lease
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                // key={i}
                src="/images/showroom2.png"
                style={{ width: "100%", display: "block" }}
                alt=""
              />

              <div className="absolute top-7 text-white w-full  ">
                <div className="w-full max-w-[300px] text-center mx-auto  text-xl sm:text-2xl md:text-4xl  font-semibold">
                  7-Day Happiness Guaranteed
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                // key={i}
                src="/images/showroom3.png"
                style={{ width: "100%", display: "block" }}
                alt=""
              />

              <div className="absolute top-7 text-white w-full  ">
                <div className="w-full max-w-[268px] text-center mx-auto  text-xl sm:text-2xl md:text-4xl  font-semibold">
                  Monthly House Cleaning
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                // key={i}
                src="/images/showroom1.png"
                style={{ width: "100%", display: "block" }}
                alt=""
              />
              <div className="absolute top-7 text-white w-full  ">
                <div className="w-full max-w-[268px] text-center mx-auto  text-xl sm:text-2xl md:text-4xl  font-semibold">
                  Choose Your Own Roommate
                </div>
              </div>
            </div>
          </Masonry>
        </div>
        {/* description container */}
        <div className="flex-1 flex items-center lg:pl-16">
          <div>
            <div className="text-4xl font-extrabold max-w-[444px]">
              Flexibility and options to suit your lifestyle.
            </div>
            <div className="mt-4 max-w-[444px]">
              You need it? We got it. We make finding your next home easy,
              comfortable, and simple. From our happiness guarantee to our
              selective roommate finder option. We provide you the flexibility
              that you most desire.
            </div>
            <Button
              label="Search Rooms"
              className="max-w-44 w-full py-4 text-white inline-flex justify-center mt-10 rounded-xl"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

const KnowAboutUs = () => {
  return (
    <Container>
      <div className="my-24">
        <div className="text-4xl font-extrabold relative ">
          Minimum living cost takes care of everything
          <div className="absolute bottom-[-1]  h-1 bg-red-500 w-full max-w-[340px] transition-opacity ease-in-out duration-300 delay-300"></div>
        </div>
        <div className="mt-24 flex flex-col lg:flex-row gap-5">
          <div className="lg:flex-[0.3]">
            <img
              src="/images/wilson.jpg"
              className="max-w-[380px] h-[502px] mx-auto w-full object-contain lg:object-cover rounded-tl-3xl rounded-bl-3xl"
            />
          </div>
          <div className="lg:flex-1  w-full py-11">
            <div className="grid grid-cols-3 gap-y-24 gap-x-6 md:gap-x-12">
              <div>
                <div className="w-20 h-20 shadow-lg flex items-center justify-center rounded-md">
                  <img src="/images/dollar.svg" className=" object-cover" />
                </div>
                <div className="text-xl font-semibold mt-5">
                  Pay as Little as possible!
                </div>
              </div>
              <div>
                <div className="w-20 h-20 shadow-lg flex items-center justify-center rounded-md">
                  <img src="/images/house.svg" className=" object-cover" />
                </div>
                <div className="text-xl font-semibold mt-5">
                  Enjoy wisdom of community!
                </div>
              </div>
              <div>
                <div className="w-20 h-20 shadow-lg flex items-center justify-center rounded-md">
                  <img src="/images/redis.svg" className=" object-cover" />
                </div>
                <div className="text-xl font-semibold mt-5">
                  Let's somebody else take care of Landlord!
                </div>
              </div>
              <div>
                <div className="w-20 h-20 shadow-lg flex items-center justify-center rounded-md">
                  <img src="/images/plant.svg" className=" object-cover" />
                </div>
                <div className="text-xl font-semibold mt-5">
                  Enjoy peaceful Environment!
                </div>
              </div>
              <div>
                <div className="w-20 h-20 shadow-lg flex items-center justify-center rounded-md">
                  <img src="/images/protect.svg" className=" object-cover" />
                </div>
                <div className="text-xl font-semibold mt-5">
                  Stay Safe! Save Money!
                </div>
              </div>
              <div>
                <div className="w-20 h-20 shadow-lg flex items-center justify-center rounded-md">
                  <img src="/images/eye.svg" className=" object-cover" />
                </div>
                <div className="text-xl font-semibold mt-5">
                  Pay for what you use !
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

// const HowItWork = () => {
//   return (
//     <Container>
//       <div className="text-white mt-12">
//         <div className="text-center text-3xl md:text-4xl ">How It Works</div>
//         <div className="flex flex-wrap items-center gap-5 justify-between mt-6">
//           {howItWorks.map((item) => (
//             <HowItWorksCard data={item} />
//           ))}
//         </div>
//       </div>
//     </Container>
//   );
// };

// const PopularResidence = () => {
//   return (
//     <Container>
//       <div className="text-white mt-12 pb-8">
//         <div className="text-center text-3xl md:text-4xl ">
//           Popular Residence
//         </div>
//         <div className="mt-8 flex gap-5 items-center flex-wrap justify-between">
//           <ResidenceCard />
//           <ResidenceCard />
//           <ResidenceCard />
//         </div>
//       </div>
//     </Container>
//   );
// };

// const ResidenceCard = () => {
//   const navigate = useNavigate();
//   return (
//     <div
//       className="glass-card shadow-card w-80 py-2 px-4 space-y-4 rounded-lg shadow-2xl hover:cursor-pointer"
//       onClick={() => navigate("/property/id")}
//     >
//       <div className="h-32 max-w-full rounded-md overflow-hidden">
//         <img
//           alt="image"
//           src="/images/home.webp"
//           className="w-full h-full object-fill"
//         />
//       </div>
//       <div className="text-btnPrimary text-2xl">Dream Resort</div>
//       <div className="text-sm">Property Desc</div>
//       <div className="text-md font-semibold">Rent: 1000PKR/Day</div>
//     </div>
//   );
// };
