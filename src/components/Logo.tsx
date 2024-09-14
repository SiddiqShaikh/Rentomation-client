import mainLogo from "/logo.svg";

interface ILogoProps {
  onClick?: () => void;
}
const Logo: React.FC<ILogoProps> = ({ onClick }) => {
  return (
    <img
      className="cursor-pointer md:block h-10 w-30 "
      src={mainLogo}
      alt="logo"
      onClick={onClick}
    />
  );
};

export default Logo;
