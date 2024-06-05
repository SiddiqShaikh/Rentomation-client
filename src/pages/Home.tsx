import React from "react";
import Button from "../components/Button";
import Container from "../components/Container";
import { HomeInterfaceProps } from "../types/commonInterface";

import HowItWorksCard from "../components/cards/HowItWorksCard";
import { howItWorks } from "../utils/mock";

const Home: React.FC<HomeInterfaceProps> = () => {
  return (
    <div className="bg-black w-full min-h-[100vh] relative">
      <div
        className="absolute w-full h-[800px] z-[1]"
        style={{
          backgroundImage: `url(/images/home.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-[2]">
        <IntroComponent />
        <KnowAboutUs />
        <HowItWork />
        <PopularResidence/>
      </div>
    </div>
  );
};

export default Home;

const IntroComponent = () => {
  return (
    <Container>
      <div className="text-white flex h-[800px] justify-center items-center">
        <div className="flex-1 px-2 md:text-start text-center">
          <div className="w-full max-w-[550px] text-3xl md:text-4xl ">
            Find Your Next Perfect Place to live
          </div>
          <div className="w-full max-w-[550px] text-sm sm:text-md md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            temporibus tenetur iure culpa, minima magnam exercitationem enim
            porro maxime voluptatem odio aliquam quo. Minima fuga magnam at
            quisquam voluptas veniam.
          </div>
          <div className="mt-6">
            <Button
              label="Show properties"
              className="max-w-[300px] inline-flex justify-center hover:bg-neutral-400"
            />
          </div>
        </div>
        {/* <div className="flex-1 hidden md:flex">Image Div</div> */}
      </div>
    </Container>
  );
};

const KnowAboutUs = () => {
  return (
    <Container>
      <div className="text-white mt-12 relative ">
        <div className="text-center text-3xl md:text-4xl ">
          Know About Us
        </div>
        <div className="flex flex-col md:flex-row items-center mt-6 gap-3 justify-center md:justify-start ">
          {/* <div className="w-[300px] absolute border border-white top-20 left-72 rounded-lg overflow-hidden">
            <div className="bg-white text-black p-2 flex items-center gap-2">
              <Avatar src={null} />
              <div className="text-sm">
                we have more than 15 years of experience
              </div>
            </div>
          </div>
          <div className="w-[150px] absolute border border-white top-80 -left-9 rounded-lg overflow-hidden">
            <div className="bg-white text-black p-2 flex items-center gap-2">
              <Avatar src={null} />
              <div className="text-sm">Reviews</div>
            </div>
          </div> */}
          <div className="flex-1 ">
            <div className="rounded-lg border border-neutral-800 overflow-hidden max-w-[500px] max-h-[300px]">
              <img
                alt="image"
                src="/images/home.webp"
                className="w-full h-full object-contain"
              />
            </div>
            {/*  */}
          </div>
          <div className="flex-1 space-y-1 md:space-y-2  mt-4 md:mt-0 md:px-2">
            <div className="text-center md:text-start text-xl md:text-2xl lg:text-4xl leading-normal">
              We are creating best communities to ease in accomodation
            </div>
            <div className="text-sm text-neutral-400">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Praesentium officia cupiditate, vitae quos iusto illo tempora,
              exercitationem impedit quam inventore, enim ex? Eum similique
              natus illum obcaecati velit iste laudantium?
            </div>
            <div className="flex justify-center md:justify-start">
              <Button
                label="Read More"
                className="max-w-[120px] inline-flex justify-center !bg-transparent border border-btnPrimary hover:text-btnPrimary"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const HowItWork = () => {
  return (
    <Container>
      <div className="text-white mt-12">
        <div className="text-center text-3xl md:text-4xl ">
          How It Works
        </div>
        <div className="flex flex-wrap items-center gap-5 justify-between mt-6">
          {howItWorks.map((item) => (
            <HowItWorksCard data={item} />
          ))}
        </div>
      </div>
    </Container>
  );
};

const PopularResidence = () => {
  return (
    <Container>
      <div className="text-white mt-12">
        <div className="text-center text-3xl md:text-4xl ">
          Popular Residence
        </div>
        <div>Cards</div>
      </div>
    </Container>
  );
};
