import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";

interface UserMenuProps {}
const UserMenu: React.FC<UserMenuProps> = () => {
  return (
    <div className="flex items-center px-2 py-1 rounded-xl gap-2 border-[1px] border-neutral-200 cursor-pointer hover:shadow-sm">
      <div className="">
        <AiOutlineMenu />
      </div>
      <div className="">
        <Avatar src={null} />
      </div>
    </div>
  );
};
export default UserMenu;
