import { ClipLoader } from "react-spinners";

const Loader = ({ size,color }: { size?: number,color?:string }) => {
  return (
    <ClipLoader
      size={size ?? 15}
      aria-label="Loading Spinner"
      data-testid="loader"
      color={color ?? "#FFFFFF"}
    />
  );
};

export default Loader;
