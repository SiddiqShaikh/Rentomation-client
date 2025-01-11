"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import apiCall from "@/utils/api";
import { Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Carousel } from "@/components/Carousel";
import { differenceInDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

interface PropertyData {
  propertyId: string;
  propertyName: string;
  description: string;
  rent: string;
  payper: "night" | "month";
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  city: string;
  images: string[];
  bed: number;
  shower: number;
  parking: boolean;
  status: string;
  owner: {
    id: string;
    name: string;
    email: string;
  };
}

interface BookingData {
  _id: string;
  startDateTime: string;
  endDateTime: string;
  status: "reserved" | "cancelled" | "booked";
}
// Demo booking data
const demoBookings: BookingData[] = [
  {
    _id: "1",
    startDateTime: "2025-01-01T00:00:00.000Z",
    endDateTime: "2025-01-03T00:00:00.000Z",
    status: "booked",
  },
  {
    _id: "2",
    startDateTime: "2024-12-30T00:31:47.000Z", // Start of this week
    endDateTime: "2025-01-05T00:31:47.000Z", // End of this week
    status: "reserved",
  },
];
export default function PropertyDetail() {
  const token = localStorage.getItem("auth-token");

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [bookings, setBookings] = useState<BookingData[]>(demoBookings);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState<Number | undefined>(0);
  const [isUser, setIsUser] = useState(null);
  const [propertyLoading, setPropertyLoading] = useState(true);
  const [disabledDatess, setDisabledDatess] = useState<Date[]>([]);
  const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const IsOnwer = property?.owner?.id === isUser?._id;

  const getPropertyById = async (id: string) => {
    setLoading(true); // Set loading state to true
    const token = localStorage.getItem("auth-token");
    try {
      const response = await apiCall(
        `property/${id}`, // Pass the property ID in the URL
        "GET",
        {}, // Empty body for GET request
        {},
        {
          "x-auth-token": `Bearer ${token}`,
        }
      );
      console.log("Property Response:", response);
      setLoading(false); // Set loading state to false
      // toast.success(response?.message); // Optionally, you can show a success toast
      return response.data; // Return the property data from the response
    } catch (error: any) {
      toast.error(error?.response?.message); // Show error message in toast
      setLoading(false); // Set loading state to false
      console.error("Property error:", error);
      throw new Error(
        error?.response?.data?.message || "Failed to fetch property"
      ); // Throw the error for further handling
    }
  };

  const getPropertyByPropertyId = async (id: string) => {
    setPropertyLoading(true); // Set loading state to true
    const token = localStorage.getItem("auth-token");
    try {
      const response = await apiCall(
        `booking/bookings/property/${id}`,
        "GET",
        {},
        {},
        {
          "x-auth-token": `Bearer ${token}`,
        }
      );
      console.log("Property Response:", response);
      setPropertyLoading(false);
      return response.bookings; // Return the property data from the response
    } catch (error: any) {
      toast.error(error?.response?.message); // Show error message in toast
      setPropertyLoading(false);
      throw new Error(
        error?.response?.data?.message || "Failed to fetch property"
      ); // Throw the error for further handling
    }
  };

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

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
        const data = await getPropertyById(id);
        const datas = await getPropertyByPropertyId(data.propertyId);

        const isOnwerExist = datas.find(
          (booking: any) =>
            booking.user === isUser?._id && booking.status === "reserved"
        );

        setIsAlreadyBooked(isOnwerExist);

        const disabledDates = datas.flatMap((booking: any) =>
          getDatesInRange(
            new Date(booking.startDateTime),
            new Date(booking.endDateTime)
          )
        );

        setDisabledDatess(disabledDates);

        setProperty(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
        setIsAdd(false);
      }
    };

    fetchProperty();
  }, [id, isUser, isAdd]);

  useEffect(() => {
    if (dateRange?.from && dateRange?.to && property) {
      const days = differenceInDays(dateRange.to, dateRange.from) + 1;
      const pricePerDay = parseInt(property.rent);
      let total;

      if (property.payper === "night") {
        total = days * pricePerDay;
      } else if (property.payper === "month") {
        total = (days / 30) * pricePerDay;
      }

      setTotalPrice(total);
    }
  }, [dateRange, property]);

  const handleBookingConfirm = async () => {
    const formatedData = {
      propertyId: property?.propertyId,
      startDateTime: dateRange?.from,
      endDateTime: dateRange?.to,
    };
    const token = localStorage.getItem("auth-token");

    try {
      const response = await apiCall(
        "booking/bookings",
        "POST",
        formatedData,
        {},
        {
          "x-auth-token": `Bearer ${token}`,
        }
      );

      toast.success("Booking confirmed successfully!");
      setIsAdd(true);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  function getDatesInRange(startDate: Date, endDate: Date) {
    const date = new Date(startDate.getTime());
    const dates = [];
    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

  if (loading || propertyLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!property) {
    return <div className="min-h-screen pt-24">Property not found</div>;
  }

  return (
    <div className="w-full min-h-screen pt-24 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row gap-8">
          <div className="flex-1 lg:flex-[3]">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-2">
                {property.propertyName}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>{property.location.name}</span>
                <div className="flex items-center">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary" />
                  ))}
                  <span className="ml-1">(4.0)</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <Carousel images={property?.images} />
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About this property</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <img src="/images/Bed.svg" alt="Bed" className="w-6 h-6" />
                    <span>{property.bed} Bed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/Shower.svg"
                      alt="Shower"
                      className="w-6 h-6"
                    />
                    <span>{property.shower} Shower</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/Size.svg"
                      alt="Size"
                      className="w-6 h-6"
                    />
                    <span>240 Size</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/Bed.svg"
                      alt="Parking"
                      className="w-6 h-6"
                    />
                    <span>{property.parking ? "Yes" : "No"} Parking</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Description</h2>
              <div
                className={`text-muted-foreground ${
                  !isExpanded && "line-clamp-3"
                }`}
              >
                {property.description}
              </div>
              <Button
                variant="link"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-0 h-auto font-semibold"
              >
                {isExpanded ? "Read less" : "Read more"}
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle>Booking</CardTitle>
                <div className="text-2xl font-bold text-primary">
                  PKR {property.rent}/{property.payper}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* <div className="space-y-2">
                  <label className="text-sm font-medium">Special Notes</label>
                  <Input placeholder="Any special requirements..." />
                </div> */}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Dates</label>
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    className="rounded-md border"
                    disabled={disabledDatess}
                    numberOfMonths={2}
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={() => {
                    if (IsOnwer) {
                      toast.error("You can't book your own property");
                      return;
                    } else if (
                      isAlreadyBooked &&
                      isAlreadyBooked.status === "reserved"
                    ) {
                      toast.error("You have already booked this property");
                      return;
                    } else {
                      setIsModalOpen(true);
                    }
                  }}
                  disabled={!dateRange?.from || !dateRange?.to}
                >
                  {"Confirm Booking"}
                </Button>
                {/* <Button variant="outline" className="w-full">
                  <Heart className="w-4 h-4 mr-2" />
                  Save To Wishlist
                </Button> */}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>THE HOST</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    {property.owner?.email?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <div className="font-semibold">Host</div>
                    <div className="text-sm text-muted-foreground">
                      {property.owner?.email}
                    </div>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    navigate(`/messages?${property.owner.id}`);
                  }}
                >
                  Contact Host
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Booking</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              <Label>Selected Dates</Label>
              <div>
                {dateRange?.from && dateRange?.to && (
                  <>
                    {format(dateRange.from, "PPP")} -{" "}
                    {format(dateRange.to, "PPP")}
                  </>
                )}
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <Label>Total Price</Label>
              <div className="text-2xl font-bold">
                PKR {totalPrice?.toFixed(2) || 0}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBookingConfirm}>Confirm Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
