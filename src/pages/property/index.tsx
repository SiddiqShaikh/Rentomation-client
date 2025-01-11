"use client";

import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import { Search } from "lucide-react";
import PropertyCard from "@/components/cards/PropertyCards";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TPropertyListing } from "@/types/commonTypes";
import apiCall from "@/utils/api";
import { Select as AntdSelect } from "antd";

interface FilterState {
  page: number;
  limit: number;
  sortType: "asc" | "desc";
  sortBy: string;
  location?: string;
  city?: string;
  rent?: string;
  title?: string;
}

export default function Properties() {
  const [loading, setLoading] = useState(false);
  const [propertyData, setPropertyData] = useState<TPropertyListing[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState<FilterState>({
    page: 1,
    limit: 12,
    sortType: "desc",
    sortBy: "createdAt",
  });
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState({
    title: "",
    city: "",
    location: "",
    rent: "",
  });

  const getAllProperties = async (params: FilterState) => {
    setLoading(true);

    try {
      const searchData = search !== null && search !== "";
      const response = await apiCall(
        searchData
          ? `property/get-all?query=${searchData}`
          : `property/get-all`,
        "GET",
        {},
        params,
        {}
      );
      if (response.success) {
        setPropertyData(response.data.docs);
        setTotalPages(Math.ceil(response.data.totalDocs / params.limit));
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.message || "Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((key: keyof FilterState, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
    }, 500),
    []
  );

  useEffect(() => {
    getAllProperties(filters);
  }, []);

  const citiesOptions = [
    { label: "Islamabad", value: "Islamabad" },
    { label: "Lahore", value: " Lahore" },
    { label: "Karachi", value: "Karachi" },
    { label: "Peshawar", value: "Peshawar" },
    { label: "Quetta", value: "Quetta" },
  ];

  const locationOptions = [
    { label: "G-11", value: "G-11" },
    { label: "G-10", value: "G-10" },
    { label: "G-9", value: "G-9" },
    { label: "G-8", value: "G-8" },
    { label: "G-7", value: "G-7" },
  ];

  const rendOptions = [
    { label: "10000", value: "10000" },
    { label: "20000", value: "20000" },
    { label: "30000", value: "30000" },
    { label: "40000", value: "40000" },
    { label: "50000", value: "50000 " },
  ];

  const handleSearch = () => {
    if (search !== "") {
      getAllProperties({});
    }

    const filterData = propertyData.filter((item) => {
      return (
        item.city?.toLowerCase().includes(searchData.city.toLowerCase()) &&
        item?.location
          .toLowerCase()
          .includes(searchData.location.toLowerCase()) &&
        item.rent.toString().includes(searchData.rent.toString())
      );
    });

    console.log(filterData, "filterData");
  };

  return (
    <div className="w-full min-h-screen pt-24">
      {" "}
      {/* Adjust pt-24 to match Navbar height */}
      <div className="h-[calc(100vh_-_96px)]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Find Your Perfect Property</h1>
            <Select
              value={`${filters.sortBy}_${filters.sortType}`}
              onValueChange={(value) => {
                const [sortBy, sortType] = value.split("_");
                setFilters((prev) => ({
                  ...prev,
                  sortBy,
                  sortType: sortType as "asc" | "desc",
                  page: 1,
                }));
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt_desc">Newest First</SelectItem>
                <SelectItem value="createdAt_asc">Oldest First</SelectItem>
                <SelectItem value="rent_asc">Price: Low to High</SelectItem>
                <SelectItem value="rent_desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by AI..."
                    className="pl-10"
                    onChange={(e) => setSearch(e.target.value)}
                    // onChange={(e) => debouncedSearch("title", e.target.value)}
                  />
                </div>
                <div>
                  {/* <Input
                    placeholder="Search by city..."
                    onChange={(e) => debouncedSearch("city", e.target.value)}
                  /> */}

                  <AntdSelect
                    placeholder="Search by city..."
                    // onChange={(value) => debouncedSearch("city", value)}
                    onChange={(value) =>
                      setSearchData((prev) => ({
                        ...prev,
                        city: value,
                      }))
                    }
                    options={citiesOptions}
                    // style={{ width: "250px" }}
                    size="large"
                    className="w-full"
                  />
                </div>
                <div>
                  {/* <Input
                    placeholder="Search by location..."
                    onChange={(e) =>
                      debouncedSearch("location", e.target.value)
                    }
                  /> */}

                  <AntdSelect
                    placeholder="Search by location..."
                    onChange={(value) =>
                      setSearchData((prev) => ({
                        ...prev,
                        location: value,
                      }))
                    }
                    options={locationOptions}
                    size="large"
                    className="w-full"
                  />
                </div>
                <div>
                  <AntdSelect
                    placeholder="Search by rent..."
                    onChange={(value) =>
                      setSearchData((prev) => ({
                        ...prev,
                        rent: value,
                      }))
                    }
                    options={rendOptions}
                    size="large"
                    className="w-full"
                  />
                  {/* <Input
                    placeholder="Search by rent..."
                    type="number"
                    onChange={(e) => debouncedSearch("rent", e.target.value)}
                  /> */}
                </div>

                <Button onClick={handleSearch}>
                  <Search className="mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-[400px] bg-muted animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : propertyData?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
                {propertyData?.map((property) => (
                  <PropertyCard key={property._id} data={property} />
                ))}
              </div>

              <div className="mt-8 flex justify-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    variant={filters.page === i + 1 ? "default" : "outline"}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, page: i + 1 }))
                    }
                    disabled={loading}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold">No properties found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
