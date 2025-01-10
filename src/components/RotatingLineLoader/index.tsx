import { RotatingLines } from "react-loader-spinner";

function RotatingLinesLoader({ width = "36" }: { width?: string }) {
    return (
        <RotatingLines
            visible
            width={width}
            strokeColor="#003358"
            strokeWidth="5"
            animationDuration="0.75"
        />
    );
}

export default RotatingLinesLoader;
