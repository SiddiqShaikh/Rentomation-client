import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

interface IInput {
  placeholder?: string;
  containerClass?: string;
  inputClass?: string;
  icon?: IconType;
  type?: string;
  onChange?: (args?: any) => void;
  name?: string;
  id: string;
  label?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required: boolean;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
}
const Input = ({
  placeholder,
  containerClass,
  inputClass,
  icon: Icon,
  type,
  onChange,
  // name,
  errors,
  id,
  // label,
  register,
  disabled,
  // formatPrice,
  required,
}: IInput) => {
  //   const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div
      className={`${containerClass} overflow-hidden border-gray-700 border rounded-md flex items-center px-1  ${
        errors && errors[id] ? "border-rose-500" : "border-neutral-300"
      }
        ${
          errors && errors[id] ? "focus:border-rose-500" : "focus:border-black"
        }`}
    >
      {Icon && <Icon size={20} />}
      <input
        className={`${inputClass} w-full bg-transparent outline-none px-2 py-1.5 text-sm flex-1  font-light  transition
        disabled:opacity-70
        disabled:cursor-not-allowed`}
        placeholder={placeholder ?? "..."}
        type={type}
        onChange={onChange}
        // name={name}
        id={id}
        disabled={disabled}
        {...(register && register(id, { required }))}
        autoComplete="new-password"
      />
    </div>
  );
};

export default Input;
