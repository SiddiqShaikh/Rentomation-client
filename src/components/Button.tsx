import { ButtonProps } from "../types/commonInterface";
import Loader from "./Loading";

const Button: React.FC<ButtonProps> = ({
  className,
  label,
  onClick,
  loading,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${className} px-4 py-1 bg-btnPrimary w-full rounded-xl  ${
        loading ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {loading ? <Loader /> : label}
    </div>
  );
};

export default Button;
