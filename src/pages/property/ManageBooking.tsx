/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { TPropertyListing } from "@/types/commonTypes";
import apiCall from "@/utils/api";
// import BookingCards from "@/components/cards/BookingCards";
import ManageBookingCard from "@/components/cards/ManageBookingCard";
import moment from "moment";

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
  const [isUser, setIsUser] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingData, setBookingData] = useState<any[]>([]);
  const [isAdd, setIsAdd] = useState(false);
  const [isBook, setIsBook] = useState([]);
  const [isBookLoading, setIsBookLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    page: 1,
    limit: 12,
    sortType: "desc",
    sortBy: "createdAt",
  });

  // const IsOnwer = property?.owner?.id === isUser?._id;
  const onwerId = isUser?._id || "";

  // console.log(IsOnwer, "propertypr33operty");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("auth-token");

    const headers = {
      "x-auth-token": `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await apiCall(
        "user/profile",
        "GET",
        null,
        null,
        headers
      );
      const userData = response.data;
      setIsUser(userData);

      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch user profile");
      setLoading(false);
    }
  };

  const getAllProperties = async (params: FilterState) => {
    setLoading(true);
    const token = localStorage.getItem("auth-token");
    try {
      const response = await apiCall("property/get-all", "GET", {}, params, {
        "x-auth-token": `Bearer ${token}`,
      });
      if (response.success) {
        setPropertyData(response.data.docs);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.message || "Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const getAllBookings = async (params: FilterState) => {
    setBookingLoading(true);
    const token = localStorage.getItem("auth-token");
    try {
      const response = await apiCall(
        `booking/bookings/owner/${onwerId}`,
        "GET",
        {},
        params,
        {
          "x-auth-token": `Bearer ${token}`,
        }
      );
      if (response.success) {
        setBookingData(response.bookings);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.message || "Failed to fetch properties");
    } finally {
      setBookingLoading(false);
    }
  };

  const getAllBook = async (params: FilterState) => {
    setIsBookLoading(true);
    const token = localStorage.getItem("auth-token");
    try {
      const response = await apiCall(
        `booking/bookings/booking/${onwerId}`,
        "GET",
        {},
        params,
        {
          "x-auth-token": `Bearer ${token}`,
        }
      );

      console.log(response, "responseresponseresponse31231");

      if (response.success) {
        setIsBook(response.bookings);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.message || "Failed to fetch properties");
    } finally {
      setIsBookLoading(false);
    }
  };

  console.log(bookingData, "bookingData");

  useEffect(() => {
    if (onwerId) {
      getAllProperties(filters);
      getAllBookings(filters);
      getAllBook(filters);
    }
  }, [filters, onwerId, isAdd]);

  console.log(propertyData, "propertyData");

  const handleBookingConfirm = async ({
    item,
    status,
  }: {
    item: any;
    status: string;
  }) => {
    setIsLoading(true);

    const token = localStorage.getItem("auth-token");

    const formatedData = {
      status: status,
      bookingId: item._id,
    };

    try {
      const response = await apiCall(
        `booking/bookings/${item._id}`,
        "PUT",
        formatedData,
        {},
        {
          "x-auth-token": `Bearer ${token}`,
        }
      );
      toast.success(response?.message);
      setIsAdd(true);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen pt-24">
      {" "}
      {/* Adjust pt-24 to match Navbar height */}
      <div className="h-[calc(100vh_-_96px)]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-center w-full text-primary">
              Manage Booking
            </h1>
          </div>

          {loading || isBookLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-[400px] bg-muted animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : (
            isBook?.length > 0 && (
              <>
                <h1 className="text-3xl font-bold mb-6">Bookings</h1>

                {isBook?.map((item: any) => (
                  <div className="py-4">
                    <div
                      key={item._id}
                      className="flex items-center justify-between gap-2 py-2 bg-gray-50 px-2 rounded-md border mb-3"
                    >
                      <h5 className="text-base font-semibold">
                        {item?.user?.username}
                      </h5>
                      <p className="text-sm">{item.user?.email}</p>
                      <p className="text-sm">{item?.rent} PKR </p>
                      <p className="text-sm">
                        {moment(item?.startDateTime).format("MMM DD, YYYY")}
                        {" - "}
                        {moment(item?.endDateTime).format("MMM DD, YYYY")}
                      </p>

                      {item?.status === "reserved" ? (
                        <Button
                          variant="secondary"
                          style={{
                            backgroundColor: "red",
                            color: "#fff",
                          }}
                          disabled={isLoading}
                          onClick={() =>
                            handleBookingConfirm({
                              item,
                              status: "cancelled",
                            })
                          }
                        >
                          Cancel
                        </Button>
                      ) : item?.status === "booked" ? (
                        <Button variant="secondary" style={{}} disabled={true}>
                          Booked
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          style={{
                            color: "red",
                          }}
                          disabled={true}
                        >
                          Cancelled
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )
          )}

          {loading || bookingLoading ? (
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
              <h1 className="text-3xl font-bold mb-6">My Properties</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {propertyData.map((property) => {
                  const booking = bookingData.filter(
                    (book) => book.property === property._id
                  );

                  return (
                    <ManageBookingCard
                      key={property._id}
                      data={property}
                      myProperty={true}
                      booking={booking}
                      setIsAdd={setIsAdd}
                    />
                  );
                })}
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
