import Container from "../../components/Container";
import HoverAnimation from "../../components/HoverAnimation";

const data: ICardProps[] = [
  {
    imgSrc: "/images/dollar.svg",
    label: "Pay as Little as possible!",
  },
  {
    imgSrc: "/images/house.svg",
    label: "Enjoy wisdom of community!",
  },
  {
    imgSrc: "/images/redis.svg",
    label: "Let's somebody else take care of Landlord!",
  },
  {
    imgSrc: "/images/plant.svg",
    label: "Enjoy peaceful Environment!",
  },
  {
    imgSrc: "/images/eye.svg",
    label: "Pay for what you use!",
  },
  {
    imgSrc: "/images/protect.svg",
    label: "Stay Safe! Save Money!",
  },
];
const KnowAboutUs = () => {
  return (
    <Container>
      <div className="my-24">
        <div className="text-2xl md:text-3xl lg:text-4xl font-bold relative transition-all duration-500 ease-in-out">
          Minimum living cost takes care of everything
          <div className="absolute bottom-[-1]  h-1 bg-red-500 w-full max-w-[340px] transition-opacity ease-in-out duration-300 delay-300 hidden md:flex"></div>
        </div>
        <div className="mt-4 md:mt-16 lg:mt-24 flex flex-col lg:flex-row gap-5">
          <div className="lg:flex-[0.3]">
            <img
              src="/images/wilson.jpg"
              className="max-w-[380px] h-[502px] mx-auto w-full object-contain lg:object-cover rounded-tl-3xl rounded-bl-3xl"
              loading="lazy"
            />
          </div>
          <div className="lg:flex-1  w-full py-11">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-24 gap-x-4 md:gap-x-12">
              {data.map((item, index) => (
                <Cards imgSrc={item.imgSrc} label={item.label} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default KnowAboutUs;

interface ICardProps {
  label: string;
  imgSrc: string;
}
const Cards: React.FC<ICardProps> = ({ imgSrc, label }) => {
  return (
    <div>
      <HoverAnimation wrapperClass="w-20 h-20 shadow-lg flex items-center justify-center rounded-md cursor-pointer">
        <img src={imgSrc} className=" object-cover" loading="lazy" />
      </HoverAnimation>
      <div className="text-xl font-semibold mt-5">{label}</div>
    </div>
  );
};
