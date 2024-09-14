interface INODATAPROPS {
  label?: string;
  img?: string;
}
const NoData: React.FC<INODATAPROPS> = ({ img, label }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="h-auto  w-full max-w-[200px]">
        <img
          src={`${img ?? "/images/empty-box.png"}`}
          alt="No Data"
          className="max-w-full"
        />
      </div>
      <div>{label ?? "NO DATA"}</div>
    </div>
  );
};

export default NoData;
