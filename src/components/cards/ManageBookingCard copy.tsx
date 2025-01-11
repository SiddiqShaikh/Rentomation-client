/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Loader, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import moment from "moment";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import apiCall from "@/utils/api";

import { useState } from "react";
import { toast } from "react-toastify";

const ManageBookingCard: React.FC<any> = ({ data, booking, setIsAdd }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsModalOpen(false);
    }
  };

  console.log(booking, "bookingbooking");

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Booking</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {booking?.map((item: any) => (
              <div
                key={item._id}
                className="flex items-center justify-between gap-2 py-2 bg-gray-50 px-2 rounded-md border mb-3"
              >
                <div>
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
                </div>

                {item?.status === "reserved" ? (
                  <div className="flex items-center gap-3">
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
                    <Button
                      variant="secondary"
                      color="primary"
                      style={{
                        backgroundColor: "green",
                        color: "#fff",
                      }}
                      disabled={isLoading}
                      onClick={() =>
                        handleBookingConfirm({
                          item,
                          status: "booked",
                        })
                      }
                    >
                      {isLoading ? <Loader /> : "Booked"}
                    </Button>
                  </div>
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
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <Card className="w-full max-w-[358px] overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative">
            <img
              src={data.images[0]}
              className="w-full h-48 object-cover"
              loading="lazy"
              alt={data.title}
            />

            <div className="absolute top-2 right-2 flex gap-2 z-10">
              <Button
                size="icon"
                variant="secondary"
                onClick={() => setIsModalOpen(true)}
              >
                <h5
                  style={{
                    color: "#000",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {booking?.length}
                </h5>
                <Users className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-xl mb-2 line-clamp-1">
            {data.title}
          </CardTitle>
          <Badge variant="secondary" className="mb-2">
            Private Room
          </Badge>
          <p className="text-2xl font-bold text-primary">
            PKR{data.rent}/month
          </p>
        </CardContent>
        <CardFooter className="flex justify-between p-4 border-t">
          <div className="flex items-center gap-2">
            <img src="/images/Bed.svg" alt="Bed" className="w-5 h-5" />
            <span>{data.bed}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/images/Shower.svg" alt="Shower" className="w-5 h-5" />
            <span>{data.shower}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/images/Size.svg" alt="Size" className="w-5 h-5" />
            <span>{data.shower}</span>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default ManageBookingCard;
