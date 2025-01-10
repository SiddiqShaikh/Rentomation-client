/* eslint-disable prefer-template */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useEffect, useRef, useState } from "react";

// Antd
import { Avatar, Input } from "antd";

// Types
// Helper
import { IoSend } from "react-icons/io5";

// React player

// Components
import RotatingLinesLoader from "../RotatingLineLoader";

// Firebase
// @ts-ignore
// import { db } from "@/utils/firebase";
// import { doc, arrayUnion, updateDoc, onSnapshot } from "firebase/firestore";
import Text from "../commonText";
import Empty from "../empty";

interface PropsTypes {
  selectedUser: any | undefined;
  adminId: string;
}

function ChatArea({ selectedUser, adminId }: PropsTypes) {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);

  const [loader, setLoader] = useState<boolean>(false);
  const [sendLoading, setSendLoading] = useState<boolean>(false);

  const channelId = selectedUser?.room_id || "";

  //   const [updateMessage] = useUpdateMessageMutation();

  // const onSend = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   let uploadedFileUrl: string | undefined = "";
  //   let typeOfMessage = "text";

  //   setSendLoading(true);

  //   const lastMessage = typeOfMessage === "text" ? input : typeOfMessage;
  //   const _content = typeOfMessage === "text" ? input : uploadedFileUrl;

  //   const roomRef = doc(db, "messages", channelId);

  //   const messageObj = {
  //     senderId: adminId,
  //     receiverId: selectedUser?.id,
  //     message: _content,
  //     timestamp: new Date(),
  //     typeOfMessage,
  //   };

  //   try {
  //     //   await updateMessage({
  //     //     data: {
  //     //       last_message: lastMessage,
  //     //     },
  //     //     id: Number(selectedUser?.id) || 0,
  //     //   });

  //     await updateDoc(roomRef, {
  //       messages: arrayUnion(messageObj),
  //       last_message: lastMessage,
  //     });
  //   } catch (error) {
  //     console.error("error", error);
  //   } finally {
  //     setInput("");
  //     setSendLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (channelId) {
  //     setLoader(true);
  //     const unsubscribe = onSnapshot(
  //       doc(db, "messages", channelId),
  //       (docSnap) => {
  //         if (docSnap.exists()) {
  //           const data = docSnap.data();
  //           if (data) {
  //             setMessages(data.messages);
  //             setLoader(false);
  //           }
  //         }
  //       }
  //     );

  //     return () => unsubscribe();
  //   }
  // }, [channelId, selectedUser?.id, selectedUser?.room_id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div className="flex items-center px-2 py-3 gap-x-2 shadow-sm">
        <Avatar
          src={
            selectedUser?.reciever_id === adminId
              ? selectedUser?.sender_user?.profile_image
              : selectedUser?.reciever_user?.profile_image
          }
        />
        <Text containerTag="h4" className="text-[18px] font-bold">
          {selectedUser?.reciever_id === adminId
            ? selectedUser?.sender_user?.first_name +
              " " +
              selectedUser?.sender_user?.last_name
            : selectedUser?.reciever_user?.first_name +
              " " +
              selectedUser?.reciever_user?.last_name}
        </Text>
      </div>
      <div className="flex-1 p-4 overflow-y-auto overflow-x-hidden scrollBar pb-1 mb-9">
        {loader ? (
          <div className="w-full h-full flex items-center justify-center">
            <RotatingLinesLoader />
          </div>
        ) : messages?.length ? (
          messages.map((item, index) => {
            const typeOfMessage = item?.typeOfMessage;
            const milliseconds =
              item?.timestamp?.seconds * 1000 +
              item?.timestamp?.nanoseconds / 1000000;

            const date = new Date(milliseconds);

            const formattedDate = date.toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <div
                key={index}
                ref={index === messages.length - 1 ? messagesEndRef : null}
                className={`w-full flex items-center my-2 ${
                  item.senderId === adminId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`w-full max-w-sm flex flex-col gap-1 rounded-md p-2 border
                                ${
                                  item.senderId === adminId
                                    ? "bg-blueColor text-white border-blueColor"
                                    : "bg-background text-blackColor border-background"
                                }
                                `}
                >
                  {typeOfMessage === "text" && (
                    <Text containerTag="h3" className="text-sm">
                      {item.message}
                    </Text>
                  )}
                  <Text
                    containerTag="h6"
                    className={`text-sm w-full flex items-center 
                                        justify-end`}
                  >
                    {formattedDate}
                  </Text>
                </div>
              </div>
            );
          })
        ) : (
          <Empty description="No Messages" />
        )}
        <div ref={messagesEndRef} />
      </div>
      <form
        action=""
        // onSubmit={onSend}
        className="w-full absolute flex items-center gap-4 bottom-1 py-2 px-3"
      >
        <Input
          placeholder="Type Something..."
          className="rounded-2xl bg-background"
          size="large"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {sendLoading ? (
          <RotatingLinesLoader />
        ) : (
          <IoSend
            type="submit"
            className="text-blueColor text-3xl cursor-pointer"
            // onClick={onSend as any}
          />
        )}
      </form>
    </>
  );
}

export default ChatArea;
