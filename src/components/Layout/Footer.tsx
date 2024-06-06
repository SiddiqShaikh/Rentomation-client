import { FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaTwitter } from "react-icons/fa";
import Container from "../Container";
import Logo from "../Logo";
import Button from "../Button";
import { MdEmail } from "react-icons/md";

interface IFooterProps {}

const Footer: React.FC<IFooterProps> = () => {
  return (
    <div className="bg-black text-white w-full">
      <hr />
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center md:place-items-start py-8">
          <div>
            <Logo />
            <div className="mt-4 text-2xl ">
              Rento<span className="text-btnPrimary">mation</span>
            </div>
          </div>
          <div>
            <div className="text-lg mb-4 font-bold">Quick Links</div>
            <div className="text-sm hover:underline cursor-pointer">
              Contact us
            </div>
            <div className="text-sm mt-2 hover:underline cursor-pointer">
              Blogs
            </div>
            <div className="text-sm mt-2 hover:underline cursor-pointer">
              About us
            </div>
          </div>
          <div>
            <div className="text-lg mb-4 font-bold">Community</div>
            <div className="text-sm hover:underline cursor-pointer">
              Contact us
            </div>
            <div className="text-sm mt-2 hover:underline cursor-pointer">
              Blogs
            </div>
            <div className="text-sm mt-2 hover:underline cursor-pointer">
              About us
            </div>
          </div>
          <div>
            {" "}
            <div className="text-lg mb-4 font-bold">Subscribe</div>
            <div className="flex">
              <input className="bg-transparent border border-neutral-400 border-r-0 rounded-l-2xl py-1 px-2 text-sm overflow-hidden focus:outline-none" />
              <Button
                label="subscribe"
                className="max-w-[100px] rounded-none rounded-r-2xl"
              />
            </div>
            <div className="flex flex-col sm:flex-row mt-2 gap-2 text-sm">
              <div className="flex gap-2 items-center ">
                <MdEmail className="text-btnPrimary"/> <div>info@gmail.com</div>
              </div>
              <div className="flex gap-2 items-center ">
                <FaPhone  className="text-btnPrimary"/> <div>+1221-123123</div>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <FaInstagram className="text-btnPrimary cursor-pointer" />
              <FaFacebook className="text-btnPrimary cursor-pointer"/>
              <FaTwitter className="text-btnPrimary cursor-pointer"/>
              <FaLinkedin className="text-btnPrimary cursor-pointer"/>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
