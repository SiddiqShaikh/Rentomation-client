import Profile from "../../../public/assets/images/no-profile.jpg";

type PropsTypes = {
  src?: string | null;
};

function Avatar({ src }: PropsTypes) {
  return (
    <div className="relative overflow-hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-background cursor-pointer">
      <img src={src || Profile} alt="Avatar" draggable={false} />
    </div>
  );
}

export default Avatar;
