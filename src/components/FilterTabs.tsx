import { SetStateAction } from "react";
import { MyproperyFilter } from "../utils/mock";

interface TabsProps {
  data: any;
  wrapperClass?: string;
  ChipContainerClass?: string;
  onClick?: (label: string) => void;
  setFilter: React.Dispatch<SetStateAction<string>>;
  filter: string;
}
const Tabs: React.FC<TabsProps> = ({
  data,
  wrapperClass,
  ChipContainerClass,
  filter,
  // onClick,
  setFilter,
}) => {
  //   className={`hover:font-semibold cursor-pointer inline-flex gap-2 items-center ${item.id !== 1 ? 'border-l border-gray-300 pl-2' : 'pl-2'}`}
  return (
    <div
      className={`w-full border border-neutral-300 flex items-center gap-4 px-2 py-2 rounded-lg ${wrapperClass}`}
    >
      {data.map((item: MyproperyFilter) => (
        <div
          className={`hover:font-semibold cursor-pointer inline-flex gap-1 items-center ${ChipContainerClass} ${filter === item.label && "font-bold "
            }  transition duration-300`}
          key={item.id}
          onClick={() => setFilter(item.label)}
        >
          <div
            className={`hover:text-[#0A142F]   `}
          >
            {item.label}
          </div>
          <div className="underline-none">{item.notification}</div>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
