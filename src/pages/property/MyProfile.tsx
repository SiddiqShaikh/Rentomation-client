"use client";
import apiCall from "@/utils/api";
import Container from "../../components/Container";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserProfile {
  username: string;
  email: string;
  cnic: string;
}
const MyProfile = () => {
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, setValue } = useForm<UserProfile>();
  const token = localStorage.getItem("auth-token");
  const headers = {
    "x-auth-token": `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await apiCall(
        "user/profile",
        "GET",
        null,
        null,
        headers
      );
      const userData = response.data;
      setValue("username", userData.username);
      setValue("email", userData.email);
      setValue("cnic", userData.cnic);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch user profile");
      setLoading(false);
    }
  };

  const onSubmit = async (data: UserProfile) => {
    try {
      await apiCall("profile", "PUT", data, {}, {});
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full min-h-screen pt-24">
      {" "}
      {/* Adjust pt-24 to match Navbar height */}
      <div className="h-[calc(100vh_-_96px)]">
        <Container>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="username">Name</Label>
                  <Input id="username" {...register("username")} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor="cnic">CNIC</Label>
                  <Input id="cnic" {...register("cnic")} />
                </div>
                <Button type="submit">Update Profile</Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default MyProfile;
