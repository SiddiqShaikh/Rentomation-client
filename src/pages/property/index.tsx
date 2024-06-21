import "react-responsive-carousel/lib/styles/carousel.min.css";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Container from "../../components/Container";
import { FaDoorOpen, FaHome, FaParking } from "react-icons/fa";
import { BiSolidWasher } from "react-icons/bi";

interface PropertyProps {}
const Property: React.FC<PropertyProps> = () => {
  return (
    <div className="bg-black w-full min-h-[100vh] relative">
      <Container>
        <div className="text-white">
          <div className="text-2xl flex items-center"><div className="flex-1">Property Name</div><div>PKR3000<span className="text-btnPrimary">/Mo</span></div></div>
          <div className="text-md text-neutral-400">XYZ address,street xyz</div>
          <div className="text-lg mt-4 h-[400px]">
            {" "}
            <img
              src="/images/home.webp"
              className="h-full w-full object-cover"
            />
          </div>
          {/* overview container */}
          <div className="text-lg mt-8 flex gap-4 flex-col md:flex-row">
            <div className="md:flex-1">
              <div className="text-xl">Overview</div>
              <div className="max-w-[700px] text-sm text-neutral-300">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, et
                neque repellat, dolorem officiis unde quae optio atque alias
                quod quaerat ea sit molestiae. Debitis eaque provident
                repudiandae architecto maiores?
              </div>
              <div className="mt-4">Highlights</div>
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="flex items-center gap-2 ">
                  <FaHome size={40} />
                  <div className="text-neutral-400 text-sm">
                    <div>Type</div>
                    <div className="text-white font-bold">Single</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ">
                  <FaParking size={40} />
                  <div className="text-neutral-400 text-sm">
                    <div>Parking</div>
                    <div className="text-white font-bold">Yes</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ">
                  <FaDoorOpen size={40} />
                  <div className="text-neutral-400 text-sm">
                    <div>Rooms</div>
                    <div className="text-white font-bold">2</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ">
                  <BiSolidWasher size={40} />
                  <div className="text-neutral-400 text-sm">
                    <div>Amenities</div>
                    <div className="text-white font-bold">Washer</div>
                  </div>
                </div>
              </div>
            </div>

            {/* owner Card */}
            <div className=" bg-gray-950 text-white shadow-lg md:flex-[0.3] rounded-md py-4 px-4 mx-auto">
              <div className="flex items-center gap-4">
                <Avatar src={null} />
                <div className="text-md">John Doe</div>
              </div>
              <div className="text-sm mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea eum
                harum optio quia aliquam beatae, id at cum soluta tempore minima
                assumenda officiis rerum deleniti autem fugiat blanditiis ipsam
                modi.
              </div>
              <div className="mt-4 flex gap-4">
                <Button
                  label="Message"
                  className="flex-1 text-sm inline-flex justify-center !bg-transparent border border-btnPrimary"
                />
                <Button
                  label="Call"
                  className="flex-1 text-sm inline-flex justify-center "
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Property;
