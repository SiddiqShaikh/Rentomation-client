import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import PropertyCard from "../../components/cards/PropertyCards";
import Container from "../../components/Container";
import Tabs from "../../components/FilterTabs";
import NoData from "../../components/Layout/NoData";
import Loader from "../../components/Loading";
import useRentModal from "../../hooks/rentModal";
import { TPropertyListing } from "../../types/commonTypes";
import apiCall from "../../utils/api";
import { MyproperyFilterOne, MyproperyFilterTwo } from "../../utils/mock";

const RentomationMyHome = () => {
  const rentModal = useRentModal();

  const [filter, setFilter] = useState("All");
  const [sortFilter, setSortFilter] = useState("newest");
  const [loading, setLoading] = useState(false);
  const [propertyData, setPropertyData] = useState<any[]>([]);
  const getMyProperty = async () => {
    setLoading(true);
    const token = localStorage.getItem("auth-token");
    try {
      const response = await apiCall(
        "property/my-properties",
        "GET",
        {},
        {},
        {
          "x-auth-token": `Bearer ${token}`,
        }
      );
      console.log("Property Response:", response);
      setLoading(false);
      // toast.success(response?.message);
      setPropertyData(response.data.docs);
    } catch (error: any) {
      toast.error(error?.response?.message);
      setLoading(false);
      console.error("Property error:", error);
    }
  };

  useEffect(() => {
    getMyProperty();
  }, [filter]);

  
  return (
    <div className="w-full min-h-screen pt-24">
      {/* Adjust pt-24 to match Navbar height */}
      <div className="">
        <Container>
          <div className="flex sm:items-center flex-col sm:flex-row">
            <div className="font-bold text-4xl my-6 flex-1">My Properties</div>
            <div className="w-full max-w-fit">
              <Button
                label="Add new"
                className=""
                onClick={() => rentModal.onOpen()}
                variant="Secondary"
              />
            </div>
          </div>
          {!loading && propertyData.length > 0 ? (
            <div className="flex items-center gap-5 flex-wrap justify-between mt-12">
              <div>
                <Tabs
                  data={MyproperyFilterOne}
                  filter={filter}
                  setFilter={setFilter}
                />
              </div>
              <div className="">
                <Tabs
                  data={MyproperyFilterTwo}
                  filter={sortFilter}
                  setFilter={setSortFilter}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="mt-16 mb-8 flex flex-wrap gap-y-24 gap-x-8 justify-center md:justify-start ">
            {loading ? (
              <Loader size={25} color="#000000" />
            ) : propertyData && propertyData.length > 0 ? (
              propertyData.map((property: TPropertyListing) =>
                filter === "All" ? (
                  <PropertyCard
                    data={property}
                    key={property._id}
                    myProperty={true}
                  />
                ) : (
                  property.status === filter && (
                    <PropertyCard
                      data={property}
                      key={property._id}
                      myProperty={true}
                    />
                  )
                )
              )
            ) : (
              <NoData />
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default RentomationMyHome;
