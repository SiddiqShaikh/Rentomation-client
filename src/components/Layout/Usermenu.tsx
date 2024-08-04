import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { useCallback, useState } from "react";
import useUserStatus from "../../hooks/userStatus";
import useLoginModal from "../../hooks/loginModal";
import useRegisterModal from "../../hooks/registerModal";

interface UserMenuProps {}
const UserMenu: React.FC<UserMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userStatus = useUserStatus();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const toggleLoginModal = useCallback(() => {
    setIsOpen((value) => !value);
    loginModal.onOpen();
  }, []);
  const toggleRegisterModal = useCallback(() => {
    setIsOpen((value) => !value);
    registerModal.onOpen();
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
            {userStatus.isLoggedIn ? (
              <>
                <MenuItem label="My trips" onClick={() => {}} />
                <MenuItem label="My favorites" onClick={() => {}} />
                <MenuItem label="My reservations" onClick={() => {}} />
                <MenuItem label="My properties" onClick={() => {}} />
                <MenuItem label="Rentomation my home" onClick={() => {}} />
                <hr />
                <MenuItem
                  label="Logout"
                  onClick={() => {
                    localStorage.removeItem("auth-token");
                    userStatus.clearUser();
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={() => toggleLoginModal()} />
                <MenuItem
                  label="Register"
                  onClick={() => {
                    toggleRegisterModal();
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
