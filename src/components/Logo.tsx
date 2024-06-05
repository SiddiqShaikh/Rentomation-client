import mainLogo from "/vite.svg";

const Logo = () => {
  return (
    <img
      className="cursor-pointer md:block h-10 w-10"
      src={mainLogo}
      alt="logo"
    />
  );
};

export default Logo;
