import { useNavigate } from "react-router-dom";
import { TPropertyListing } from "../../types/commonTypes";

const PropertyCard = ({ data }: { data: TPropertyListing }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full max-w-[358px] rounded-xl shadow-lg overflow-hidden border hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out "
      onClick={() => navigate(`/property/detail?id=${data._id}`)}
    >
      <img src={data.images[0]} className="w-full h-72" loading="lazy" />

      <div className="font-bold text-xl mt-4 mx-7 line-clamp-1 overflow-hidden text-ellipsis">
        {data.title}
      </div>
      <div className="text-lg mt-5 mx-7 text-[#818181]">Private Room</div>
      <div className="font-bold text-2xl  mx-7 text-[#F4511E] mb-5">
        PKR{data.rent}/month
      </div>
      <div className="border-t border-neutral-200 flex justify-around py-5">
        <div className="flex items-center gap-2 text-sm font-bold ">
          <img src="/images/Bed.svg" />
          <div>{data.bed}</div>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold ">
          <img src="/images/Shower.svg" />
          <div>{data.shower}</div>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold ">
          <img src="/images/Size.svg" />
          <div>{data.shower}</div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
