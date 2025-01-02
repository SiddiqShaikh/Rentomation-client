import { ButtonProps } from "../types/commonInterface";
import Loader from "./Loading";

const Button: React.FC<ButtonProps> = ({
  className,
  label,
  onClick,
  loading,
  variant,
  icon: Icon,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${className} gap-1 inline-flex justify-center px-4 py-2 ${
        variant === "Secondary"
          ? "border border-btnPrimary bg-none items-center text-btnPrimary hover:text-white"
          : "bg-btnPrimary text-white"
      } transition-all duration-700 ease-in-out w-full rounded-xl hover:bg-[#0A142F] ${
        loading ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {Icon && <Icon size={20} className="" />}
      {loading ? <Loader /> : label}
    </div>
  );
};

export default Button;
