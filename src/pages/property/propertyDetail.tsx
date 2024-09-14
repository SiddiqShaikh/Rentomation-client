import { useSearchParams } from "react-router-dom";
import Container from "../../components/Container";

import img1 from "../../../public/images/prop-five.jpg";
import img2 from "../../../public/images/prop-four.jpg";
import img3 from "../../../public/images/prop-one.jpg";
import Carousel from "../../components/Carousel";
import PropertyBookingCalendar from "../../components/Calendar";
import { RiStarSFill } from "react-icons/ri";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { FaRegHeart } from "react-icons/fa";
import { useState } from "react";

const PropertyDetail = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  console.log(id);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const slides = [img1, img2, img3];
  return (
    <div className="w-full min-h-screen pt-24 pb-24">
      {" "}
      {/* Adjust pt-24 to match Navbar height */}
      <div className="">
        <Container>
          <div className="flex flex-col xl:flex-row items-center gap-4 ">
            <div className="flex-1 lg:flex-[3] px-2 flex-shrink-0">
              <div className="text-4xl font-bold ">South View 3</div>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-lg font-semibold text-slate-400 ">
                  Gulshan-e-Iqbal, Karachi{" "}
                </div>
                <div className="text-lg font-semibold text-slate-400 inline-flex items-center  ">
                  {" "}
                  <RiStarSFill />
                  <RiStarSFill />
                  <RiStarSFill />
                  <RiStarSFill /> (4.0)
                </div>
              </div>
              <div className="flex-1 overflow-hidden rounded-lg shadow-md">
                <Carousel slides={slides} autoSlide={true} />
              </div>
              <div className="px-2 mt-6 text-2xl md:text-3xl lg:text-4xl transition-all ease-in-out duration-200 font-semibold">
                About this property
              </div>
              <div className="flex items-center justify-between gap-4 px-2 mt-4 overflow-hidden bg-slate-200 p-4 rounded-md">
                <div className="flex items-center gap-2 text-sm font-bold justify-center flex-1 ">
                  <img src="/images/Bed.svg" />
                  <div>2</div>
                  <div>Bed</div>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold justify-center flex-1 ">
                  <img src="/images/Size.svg" />
                  <div>240</div>
                  <div>Size</div>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold justify-center flex-1 ">
                  <img src="/images/Shower.svg" />
                  <div>2</div>
                  <div>Shower</div>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold justify-center flex-1 ">
                  <img src="/images/Bed.svg" />

                  <div>Parking</div>
                </div>
              </div>
              <div className="px-2 mt-6 text-2xl md:text-3xl lg:text-4xl transition-all ease-in-out duration-200 font-semibold">
                Description
              </div>
              <div>
                <div
                  className={`px-2 mt-2 text-[16px] transition-all ease-in-out duration-300 font-normal text-neutral-500 ${
                    isExpanded ? "" : "line-clamp-2 overflow-hidden"
                  }`}
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                  nemo libero molestiae excepturi fugit temporibus culpa
                  voluptatem ullam facere modi fugiat voluptas explicabo,
                  necessitatibus blanditiis! Delectus saepe quo ad nihil? Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Error nemo
                  libero molestiae excepturi fugit temporibus culpa voluptatem
                  ullam facere modi fugiat voluptas explicabo, necessitatibus
                  blanditiis! Delectus saepe quo ad nihil? Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Error nemo libero molestiae
                  excepturi fugit temporibus culpa voluptatem ullam facere modi
                  fugiat voluptas explicabo, necessitatibus blanditiis! Delectus
                  saepe quo ad nihil?
                </div>
                <button
                  onClick={toggleReadMore}
                  className="text-btnPrimary mt-2 hover:underline px-2"
                >
                  {isExpanded ? "Read less" : "Read more"}
                </button>
              </div>
            </div>
            <div className="flex-1 px-2 ">
              {/* <PropertyBookingCalendar /> */}
              <div className="w-full border border-neutral-300 mb-4 rounded-md max-w-[500px] mx-auto">
                <div className="border-b border-neutral-300 p-4 flex items-center">
                  <div className=" text-lg font-semibold flex-1">Booking</div>
                  <div className="text-center text-lg md:text-2xl  text-btnPrimary font-bold lg:hidden">
                    PKR5000/Night
                  </div>
                </div>
                <div className="px-4 pt-4">Any Special Notes</div>
                <div className="px-4">
                  <Input
                    id="notes"
                    required={false}
                    placeholder="special notes.."
                    containerClass="p-2"
                  />
                </div>
                <div className="px-4 py-4 w-full border-b border-neutral-300">
                  <PropertyBookingCalendar />
                </div>
                <div className="text-center text-2xl px-4 pt-4 text-btnPrimary font-semibold hidden lg:block">
                  PKR5000/Night
                </div>
                <div className="mx-auto w-full max-w-[300px] px-4 py-4">
                  <Button label="Confirm Booking " className="" />
                </div>
                <div className="mx-auto w-full max-w-[300px] px-4 pt-2 py-4">
                  <Button
                    label="Save To Wishlist "
                    // className="bg-transparent !text-btnPrimary border border-btnPrimary !hover:text-white"
                    variant="Secondary"
                    icon={FaRegHeart}
                  />
                </div>
              </div>

              <div className="w-full border border-neutral-300 rounded-md max-w-[500px] mx-auto ">
                <div className="border-b border-neutral-300 p-4 text-lg font-semibold">
                  THE HOST
                </div>
                <div className="flex items-center p-4 gap-2">
                  <div className="h-14 w-14  rounded-full flex items-center justify-center border border-neutral-200 cursor-pointer">
                    <img src="/vite.svg" className="object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold">Emilia Tyler</div>
                    <div className="text-sm">emilia@gmail.com</div>
                  </div>
                </div>
                <div className="px-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud
                </div>
                <div className="w-full px-4 pt-4 pb-8">
                  <Button
                    label="Contact Host "
                    className=""
                    variant="Secondary"
                  />
                </div>
              </div>
              {/* <div className="w-full pt-8 hidden lg:block">
                <Button
                  label="Contact Host "
                  className=""
                  variant="Secondary"
                />
              </div> */}
            </div>
          </div>
        </Container>

        {/*  */}
      </div>
    </div>
  );
};

export default PropertyDetail;
