import { useEffect, useState, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from "react-toastify";
import PropertyCard from "../../components/cards/PropertyCards";
import Container from "../../components/Container";
import Input from "../../components/Input";
import NoData from "../../components/Layout/NoData";
import Loader from "../../components/Loading";
import { TPropertyListing } from "../../types/commonTypes";
import apiCall from "../../utils/api";
import { debounce } from "lodash";

interface PropertyProps {}
const Properties: React.FC<PropertyProps> = () => {
  const [loading, setLoading] = useState(false);
  const [propertyData, setPropertyData] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useState({
    search: "",
    rentRange: "",
  });

  const getAllProperties = async (params = {}) => {
    setLoading(true);
    try {
      const response = await apiCall("property/get-all", "GET", {}, params, {});
      console.log("Property Response:", response);
      setLoading(false);
      setPropertyData(response.data.docs);
    } catch (error: any) {
      toast.error(error?.response?.message);
      setLoading(false);
      console.error("Property error:", error);
    }
  };

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearchParams((prev) => ({ ...prev, search: value }));
    }, 500),
    []
  );

  // const handleRentRangeChange = (min: number, max: number) => {
  //   setSearchParams((prev) => ({ ...prev, rentRange: `${min}-${max}` }));
  // };

  useEffect(() => {
    getAllProperties(searchParams);
  }, [searchParams]);

  return (
    <div className="w-full min-h-screen pt-24">
      <Container>
        <div className="font-bold text-4xl my-6">Properties</div>
        <Input
          placeholder="Search by location, title, or city..."
          inputClass="text-black"
          containerClass="rounded-xl py-1 max-w-[400px]"
          icon={CiSearch}
          id="search"
          required={false}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {/* <div className="flex items-center mt-4">
          <label className="mr-4">Rent Range:</label>
          <input
            // type="number"
            placeholder="Min Rent"
            onChange={(e) => handleRentRangeChange(e.target.value, searchParams.rentRange.split('-')[1])}
            className="text-black mr-2"
          />
          <input
            type="number"
            placeholder="Max Rent"
            onChange={(e) => handleRentRangeChange(searchParams.rentRange.split('-')[0], parseInt(e.target.value))}
            className="text-black"
          />
        </div> */}
        <div className="mt-16 mb-8 flex flex-wrap gap-y-24 gap-x-8 justify-center md:justify-start ">
          {loading ? (
            <Loader size={25} color="#000000" />
          ) : propertyData && propertyData.length > 0 ? (
            propertyData.map((property: TPropertyListing) => (
              <PropertyCard data={property} key={property._id} />
            ))
          ) : (
            <NoData />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Properties;
