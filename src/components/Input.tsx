interface IInput {
  placeholder?: string;
  containerClass?: string;
  inputClass?: string;
  Icon?: string;
  type?: string;
  onChange?: (args?: any) => void;
  name?: string;
}
const Input = ({
  placeholder,
  containerClass,
  inputClass,
  Icon,
  type,
  onChange,
  name,
}: IInput) => {
  //   const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div
      className={`${containerClass} overflow-hidden border-gray-700 border rounded-md flex items-center px-1`}
    >
      <input
        className={`${inputClass} w-full bg-transparent outline-none px-2 py-1.5 text-white text-sm flex-1`}
        placeholder={placeholder ?? "..."}
        type={type}
        onChange={onChange}
        name={name}
      />
      {Icon && <div>Icon</div>}
    </div>
  );
};

export default Input;
