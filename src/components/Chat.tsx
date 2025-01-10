// import React, { useEffect, useState } from "react";

import { useState } from "react";
import SearchBar from "./searchBar";
import Loader from "./Loading";
import Empty from "./empty";
import ChatArea from "./chatArea";

// // Helper
// import { getCookies } from "@/helpers/cookie";

// // Types
// import { chatUserDataType } from "@/types/chatTypes";

// // Redux
// import { useGetAllMessageQuery } from "@/redux/slice/messageSlice";

// // Components
// import ChatArea from "../molecules/chatArea";
// import UserAvatar from "../molecules/chatAvatar";
// import ChatModel from "../molecules/chatModel";
// import MiniLoader from "../molecules/miniLoader";
// import SearchBar from "../molecules/searchBar";
// import Empty from "../atoms/empty";

function Chat() {
  const [selectedUser, setSelectedUser] = useState<any>();
  const [search, setSearch] = useState<string>("");

  //   const {
  //     data: getAllUser,
  //     isLoading: userLoading,
  //     isFetching: userFetching,
  //   } = useGetAllMessageQuery(search);

  //   const users = getAllUser?.data?.messages;

  //   useEffect(() => {
  //     if (users && users.length && !selectedUser) {
  //       setSelectedUser(users[0]);
  //     }
  //   }, [users]);

  //   useEffect(() => {
  //     const user = getCookies("fit_form_user");
  //     const userParse = user && JSON.parse(user);
  //     setAdminId(userParse?.id);
  //   }, []);

  return (
    <>
      <div className="flex overflow-hidden h-[80vh] sm:gap-x-6 gap-x-2">
        <div className="flex-[1] flex flex-col bg-white rounded-lg py-5 border border-lightGray2 overflow-hidden">
          <div className="flex items-center sm:flex-row flex-col justify-between gap-2 px-3 mb-6">
            <SearchBar extraClass="w-full" setSearch={setSearch} hidden />
          </div>
          {/* {userLoading || userFetching ? (
            <Loader />
          ) : (
            <div className="flex flex-col gap-1 items-center sm:items-start h-full overflow-y-auto overflow-x-hidden scrollBar">
              {users?.length ? (
                users?.map((user: chatUserDataType) => {
                  if (user?.reciever_id === adminId) {
                    return (
                      <UserAvatar
                        selectedId={selectedUser?.id === user?.id}
                        name={
                          user?.sender_user?.first_name +
                          " " +
                          user?.sender_user?.last_name
                        }
                        email={user?.sender_user?.email}
                        profileImage={user?.sender_user?.profile_image}
                        onClick={() => {
                          setSelectedUser(user);
                        }}
                      />
                    );
                  }
                  return (
                    <UserAvatar
                      selectedId={selectedUser?.id === user?.id}
                      name={
                        user?.reciever_user?.first_name +
                        " " +
                        user?.reciever_user?.last_name
                      }
                      email={user?.reciever_user?.email}
                      profileImage={user?.reciever_user?.profile_image}
                      onClick={() => {
                        setSelectedUser(user);
                      }}
                    />
                  );
                })
              ) : (
                <Empty description="No User Found" />
              )}
            </div>
          )} */}
        </div>
        <div className="relative flex-[3] flex flex-col bg-white border border-lightGray2 rounded-md pb-[70px] overflow-hidden">
          <ChatArea selectedUser={selectedUser} />
        </div>
      </div>
    </>
  );
}

export default Chat;
