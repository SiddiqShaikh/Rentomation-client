import { ButtonProps } from "../types/commonInterface";

const Button: React.FC<ButtonProps> = ({ className, label, onClick }) => {
    return (
      <div
        onClick={onClick}
        className={`${className} px-4 py-1 bg-btnPrimary w-full rounded-xl cursor-pointer`}
      >
        {label ?? "Click"}
      </div>
    );
  };

  export default Button