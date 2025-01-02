import Masonry from "react-responsive-masonry";
import Container from "../../components/Container";
import Button from "../../components/Button";

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
                loading="lazy"
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
                loading="lazy"
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
                loading="lazy"
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
                loading="lazy"
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
            {/* <Button
              label="Search Rooms"
              className="max-w-44 w-full py-4 text-white inline-flex justify-center mt-10 rounded-xl"
            /> */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SearchRoom;
