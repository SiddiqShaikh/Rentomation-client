interface ContainerProps {
  children: React.ReactNode;
  id?: string;
}

const Container: React.FC<ContainerProps> = ({ children, id }) => {
  return (
    <div className="max-w-[2520px] xl:px-20 md:px-10 sm:px-2 px-4" id={id}>
      {children}
    </div>
  );
};
export default Container;
