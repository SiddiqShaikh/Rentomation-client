import apiCall from "@/utils/api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Message: React.FC = () => {
  const [isUser, setIsUser] = useState(null);

  // const getAllMessageUser = async () => {
  //   const token = localStorage.getItem("auth-token");
  //   const params = {
  //     user: isUser,
  //   };
  //   try {
  //     const response = await apiCall(`message/messages`, "GET", {}, params, {
  //       "x-auth-token": `Bearer ${token}`,
  //     });

  //     console.log(response, "responseresponseresponse31231");
  //   } catch (error: any) {
  //     toast.error(error?.response?.message || "Failed to fetch properties");
  //   } finally {
  //     // setIsBookLoading(false);
  //   }
  // };

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
    } catch (error) {
      toast.error("Failed to fetch user profile");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    // getAllMessageUser();
  }, []);

  return (
    <div className="w-full min-h-[100vh] flex bg-gray-100 pt-20">
      {/* Sidebar */}
      <aside className="w-1/4 min-h-[100vh] bg-white shadow-md">
        <div className="p-4 text-lg font-semibold border-b">Chat App</div>
        <ul>
          <li className="p-4 hover:bg-gray-200 cursor-pointer">User 1</li>
          <li className="p-4 hover:bg-gray-200 cursor-pointer">User 2</li>
          <li className="p-4 hover:bg-gray-200 cursor-pointer">User 3</li>
        </ul>
      </aside>

      {/* Main Chat Area */}
      <main className="w-3/4 flex flex-col">
        {/* Header */}
        <header className="p-4 bg-white border-b flex items-center">
          <h1 className="text-lg font-semibold">Chat with User 1</h1>
        </header>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-start mb-4">
            <div className="bg-blue-500 text-white p-3 rounded-md max-w-sm">
              Hello! How can I help you today?
            </div>
          </div>
          <div className="flex items-start mb-4 justify-end">
            <div className="bg-gray-200 text-black p-3 rounded-md max-w-sm">
              Hi! I need some information regarding my account.
            </div>
          </div>
        </div>

        {/* Input Box */}
        <footer className="p-4  border-t flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-md outline-none"
          />
          <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
            Send
          </button>
        </footer>
      </main>
    </div>
  );
};

export default Message;
