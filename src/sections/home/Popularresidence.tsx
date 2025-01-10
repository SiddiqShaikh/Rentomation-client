import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import PropertyCard from "../../components/cards/PropertyCards";
import Container from "../../components/Container";
import Loader from "../../components/Loading";
import { TPropertyListing } from "../../types/commonTypes";
import apiCall from "../../utils/api";

const PopularResidence = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [properties, setProperties] = useState<TPropertyListing[]>([]);
  const getMyProperty = async () => {
    setLoading(true);
    try {
      const response = await apiCall(
        "property/get-all",
        "GET",
        null,
        { limit: 4 },
        {}
      );
      console.log("Property Response:", response);
      setLoading(false);
      setProperties(response.data.docs);
    } catch (error: any) {
      toast.error(error?.response?.message);
      setLoading(false);
      console.error("Property error:", error);
    }
  };
  useEffect(() => {
    getMyProperty();
  }, []);
  return (
    <Container>
      <div className="my-16">
        <div className="flex items-center flex-wrap gap-y-4">
          <div className="text-4xl font-extrabold relative flex-1 text-nowrap">
            List of properties
            <div className="absolute bottom-[-1]  h-1 bg-red-500 w-full max-w-[60px] transition-opacity ease-in-out duration-300 delay-300"></div>
          </div>
          <Button
            label="View All Property"
            className="max-w-fit min-w-fit w-full py-4 text-white inline-flex justify-center rounded-xl"
            onClick={() => navigate("/property/all")}
          />
        </div>

        <div className="mt-16 flex flex-wrap gap-y-24 gap-x-8 justify-center md:justify-start ">
          {loading ? (
            <Loader size={25} color="#000000" />
          ) : properties?.length > 0 ? (
            properties.map((property: TPropertyListing) => (
              <PropertyCard data={property} key={property._id} />
            ))
          ) : (
            <div className="text-center py-12 w-full flex items-center justify-center">
              <img
                src={"/images/noProperty.png"}
                alt="not found"
                width={700}
                height={700}
                // className="rounded-full h-6 w-6"
              />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default PopularResidence;
