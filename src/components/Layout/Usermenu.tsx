import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { useCallback, useState } from "react";

interface UserMenuProps {}
const UserMenu: React.FC<UserMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div className="flex items-center px-2 py-1 rounded-xl gap-2 border-[1px] border-neutral-200 cursor-pointer hover:shadow-sm ">
      <div className="" onClick={toggleOpen}>
        <AiOutlineMenu />
      </div>
      <div className="" onClick={toggleOpen}>
        <Avatar src={null} />
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-black bg-opacity-20 text-white overflow-hidden right-2 top-14 text-sm z-20">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem label="My trips" onClick={() => {}} />
              <MenuItem label="My favorites" onClick={() => {}} />
              <MenuItem label="My reservations" onClick={() => {}} />
              <MenuItem label="My properties" onClick={() => {}} />
              <MenuItem label="Rentomation my home" onClick={() => {}} />
              <hr />
              <MenuItem label="Logout" onClick={() => {}} />
            </>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
