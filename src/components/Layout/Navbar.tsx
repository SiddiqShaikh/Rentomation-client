import { NavbarProps } from "../../types/commonInterface";
import Button from "../Button";
import Container from "../Container";
import Logo from "../Logo";
import UserMenu from "./Usermenu";

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="w-full bg-black text-white">
      <Container>
        <div className="flex items-center py-4">
          <div className="flex-1 md:flex-[0.6]">
            <Logo />
          </div>
          <div className="flex-1 items-center gap-2 md:gap-6 md:flex hidden">
            <div className="cursor-pointer hover:text-btnPrimary">Home</div>
            <div className="cursor-pointer hover:text-btnPrimary">Rentomation</div>
            <div className="cursor-pointer hover:text-btnPrimary">About</div>
            <div className="cursor-pointer hover:text-btnPrimary">Contact</div>
          </div>
          <div className="hidden md:flex">
            <Button
              label="Login/Register"
              className="text-white max-w-[200px]"
            />
          </div>
          <div className="flex md:hidden">
            <UserMenu />
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Navbar;
