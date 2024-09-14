import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

type Options = {
  label: string;
  value: string;
  key: number;
  lat?: number;
  lng?: number;
};

interface IInput {
  placeholder?: string;
  containerClass?: string;
  inputClass?: string;
  icon?: IconType;
  type?: string;
  name?: string;
  id: string;
  label?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required: boolean;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
  options: Options[];
  onChange?: (value: any) => void;
}
const Select = ({
  containerClass,
  icon: Icon,
  id,
  required,
  register,
  options,
  placeholder,
  errors,
  onChange,
}: IInput) => {
  return (
    <div
      className={`${containerClass} overflow-hidden border-gray-700 border rounded-md flex items-center px-1  ${
        errors && errors[id] ? "border-rose-500" : "border-neutral-300"
      }
        ${
          errors && errors[id] ? "focus:border-rose-500" : "focus:border-black"
        } `}
    >
      {Icon && <Icon size={20} />}
      <select
        id={id}
        className={`w-full bg-transparent outline-none px-2 py-1.5 text-sm flex-1  font-light transition
      disabled:opacity-70
      disabled:cursor-not-allowed`}
        {...(register && register(id, { required }))}
        onChange={(event) => {
          const selectedOption = options.find(
            (option) => option.value === event.target.value
          );
          console.log(selectedOption);
          onChange && onChange(selectedOption);
        }}
      >
        <option value="" disabled className="bg-neutral-300">
          {placeholder}
        </option>
        {options.map((option) => (
          <option value={option.value} key={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
