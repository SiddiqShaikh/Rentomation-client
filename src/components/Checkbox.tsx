import { FieldValues, UseFormRegister } from "react-hook-form";

interface ICheckBoxOption {
  value: string;
  label: string;
  name: string;
}

interface ICheckBoxProps {
  label: string;
  options: ICheckBoxOption[];
  id: string;
  required: boolean;
  register?: UseFormRegister<FieldValues>;
}

const Checkbox: React.FC<ICheckBoxProps> = ({
  label,
  options,
  id,
  register,
  required,
}) => {
  return (
    <div className="flex items-center px-1 text-sm font-light">
      <div className="text-sm font-light">{label}</div>
      <div className="flex ml-2 items-center">
        {options.map((opt, index) => (
          <label className="mr-4" key={index}>
            <input
              type="radio"
              value={opt.value}
              id={id}
              {...(register ? register(id, { required }) : {})}
            />
            <span className="ml-1">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Checkbox;
