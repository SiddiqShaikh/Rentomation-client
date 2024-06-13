import { ClipLoader } from "react-spinners";

const Loader = ({ size }: { size?: number }) => {
  return (
    <ClipLoader
      size={size ?? 15}
      aria-label="Loading Spinner"
      data-testid="loader"
      color="#FFFFFF"
    />
  );
};

export default Loader;
