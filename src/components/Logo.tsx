import mainLogo from "/logo.svg";

const Logo = () => {
  return (
    <img
      className="cursor-pointer md:block h-10 w-30 "
      src={mainLogo}
      alt="logo"
    />
  );
};

export default Logo;
