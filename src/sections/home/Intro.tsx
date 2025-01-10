import Container from "../../components/Container";

const IntroComponent = () => {
  return (
    <Container id="home">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-center items-center text-white h-[800px]">
        <div className="lg:flex-1 px-2 lg:text-start text-center">
          <div className="w-full max-w-[550px] font-bold text-5xl">
            Find your next and{" "}
            <span className="text-btnPrimary">most affortable perfect</span>{" "}
            place to live
          </div>
        </div>
        {/* <div className="lg:flex-1 w-full  px-2 md:px-0">
            <div className="max-w-[500px] w-full mx-auto flex ">
              <Input
                placeholder="Search"
                containerClass=" flex-1 !rounded-r-none rounded-md border border-white border-r-0 "
                inputClass="placeholder-white "
                id="search"
                required={false}
                
              />
              <Button
                label="Search"
                className="max-w-[100px] inline-flex justify-center !rounded-l-none rounded-md py-2"
              />
            </div>
          </div> */}
      </div>
    </Container>
  );
};

export default IntroComponent;
