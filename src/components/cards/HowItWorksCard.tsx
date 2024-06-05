import { MdSupervisorAccount } from "react-icons/md";

const HowItWorksCard = ({ data }: { data: any }) => {
  return (
    <div className="shadow-lg border border-neutral-950 rounded-md w-full max-w-[350px] space-y-2 px-4 py-2">
      <MdSupervisorAccount size={40} />
      <div>{data.heading}</div>
      <div>{data.description}</div>
    </div>
  );
};

export default HowItWorksCard;
