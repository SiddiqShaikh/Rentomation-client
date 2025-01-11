import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Container from "../Container";

interface IFooterProps {}

const Footer: React.FC<IFooterProps> = () => {
  return (
    <div className="w-full pb-2 relative pt-20" id="contact">
      <Container>
        <div className="w-full h-[2px] bg-red-500"></div>
        <div className="mt-24 flex flex-col lg:flex-row items-center gap-y-12">
          <div className="flex-1 text-center font-extrabold text-4xl">
            Rento<span className="text-btnPrimary">mation</span>
          </div>
          <div className="flex-1">
            <div className="flex gap-2 items-center">
              <FaLocationDot size={15} className="text-btnPrimary" /> 345
              Faulconer Drive, Suite 4 • Charlottesville, CA, 12345
            </div>
            <div className="flex items-center gap-x-12 mt-2">
              <div className="flex gap-2 items-center">
                <FaPhone size={15} className="text-btnPrimary" />
                (123) 456-7890
              </div>
              <div className="flex gap-2 items-center">
                <FaLocationDot size={15} className="text-btnPrimary" />
                (123) 456-7890
              </div>
            </div>
            <div className="flex gap-x-12 items-center mt-10">
              <div className="text-[#0A142F] ">Social Media</div>
              <div className="flex items-center gap-x-8">
                <FaFacebook size={20} className="text-btnPrimary" />
                <FaInstagram size={20} className="text-btnPrimary" />
                <FaLinkedin size={20} className="text-btnPrimary" />
                <FaTwitter size={20} className="text-btnPrimary" />
                <FaFacebook size={20} className="text-btnPrimary" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-red-500 max-w-7xl mx-auto mt-20"></div>
        <div className="w-full max-w-7xl mx-auto mt-6 flex flex-col lg:flex-row items-center gap-y-8">
          <div className="flex-1 flex items-center gap-x-6 text-sm px-2">
            <div>ABOUT US</div>
            <div>CONTACT US</div>
            <div>PRIVACY POLICY</div>
            <div>DISCLAIMER</div>
          </div>
          <div className="text-sm text-[#0A142F]">
            Copyright © 2020 Minimumlivingcost. All rights reserved
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
