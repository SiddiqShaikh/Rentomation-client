/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { TPropertyListing } from "@/types/commonTypes";
import apiCall from "@/utils/api";
import BookingCards from "@/components/cards/BookingCards";

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

export default function ManageBooking() {
  const [loading, setLoading] = useState(false);
  const [propertyData, setPropertyData] = useState<TPropertyListing[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState<FilterState>({
    page: 1,
    limit: 12,
    sortType: "desc",
    sortBy: "createdAt",
  });

  const getAllProperties = async (params: FilterState) => {
    setLoading(true);
    try {
      const response = await apiCall("property/get-all", "GET", {}, params, {});
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

  useEffect(() => {
    getAllProperties(filters);
  }, [filters]);

  return (
    <div className="w-full min-h-screen pt-24">
      {" "}
      {/* Adjust pt-24 to match Navbar height */}
      <div className="h-[calc(100vh_-_96px)]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Manage All booking</h1>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-[400px] bg-muted animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : propertyData.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {propertyData.map((property) => (
                  <BookingCards key={property._id} data={property} />
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
            <div className="text-center py-12 flex items-center justify-center">
              <h3 className="text-lg font-semibold">No Booking Found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
