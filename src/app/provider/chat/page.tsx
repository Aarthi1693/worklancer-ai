"use client";

import { useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";

const contacts = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Frontend Developer",
    online: true,
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "UI/UX Designer",
    online: true,
  },
  {
    id: 3,
    name: "Arjun Patel",
    role: "AI Engineer",
    online: false,
  },
];

export default function ProviderChatPage() {
  const [selectedUser, setSelectedUser] =
    useState(contacts[0]);

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] = useState([
    {
      sender: "Rahul Sharma",
      text: "Hello! I have completed the first module.",
    },
    {
      sender: "Provider",
      text: "Great work. Please proceed with the next phase.",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "Provider",
        text: message,
      },
    ]);

    setMessage("");
  };

  return (
    <DesktopLayout>
      <div className="h-[85vh] flex gap-6">

        {/* Contact List */}

        <div
          className="
            w-[320px]
            rounded-3xl
            border
            border-white/[0.08]
            bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
            p-5
          "
        >
          <h2 className="text-2xl font-bold mb-6">
            Chats
          </h2>

          <div className="space-y-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() =>
                  setSelectedUser(contact)
                }
                className="
                  p-4
                  rounded-2xl
                  cursor-pointer
                  hover:bg-slate-800
                  transition
                "
              >
                <div className="flex items-center justify-between">

                  <div>
                    <h3 className="font-semibold">
                      {contact.name}
                    </h3>

                    <p className="text-sm text-slate-400">
                      {contact.role}
                    </p>
                  </div>

                  <div
                    className={`w-3 h-3 rounded-full ${
                      contact.online
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}

        <div
          className="
            flex-1
            rounded-3xl
            border
            border-white/[0.08]
            bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
            flex
            flex-col
          "
        >

          {/* Header */}

          <div
            className="
              p-6
              border-b
              border-white/[0.08]
            "
          >
            <h2 className="text-2xl font-bold">
              {selectedUser.name}
            </h2>

            <p className="text-slate-400">
              {selectedUser.role}
            </p>
          </div>

          {/* Messages */}

          <div className="flex-1 p-6 overflow-y-auto space-y-4">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "Provider"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md px-5 py-3 rounded-2xl ${
                    msg.sender === "Provider"
                       ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                      : "bg-slate-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

          </div>

          {/* AI Suggested Replies */}

          <div className="px-6 pb-3">

            <p className="text-sm text-slate-400 mb-3">
              AI Suggested Replies
            </p>

            <div className="flex gap-2 flex-wrap">

              <button
                onClick={() =>
                  setMessage(
                    "Great work, keep going."
                  )
                }
                className="
                  px-3
                  py-2
                  rounded-xl
                  bg-slate-800
                "
              >
                Great Work
              </button>

              <button
                onClick={() =>
                  setMessage(
                    "Please update the progress."
                  )
                }
                className="
                  px-3
                  py-2
                  rounded-xl
                  bg-slate-800
                "
              >
                Update Progress
              </button>

              <button
                onClick={() =>
                  setMessage(
                    "Let's schedule a review."
                  )
                }
                className="
                  px-3
                  py-2
                  rounded-xl
                  bg-slate-800
                "
              >
                Schedule Review
              </button>

            </div>

          </div>

          {/* Input */}

          <div
            className="
              p-6
              border-t
              border-white/[0.08]
              flex
              gap-3
            "
          >
            <input
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="Type a message..."
              className="
                flex-1
                p-3
                rounded-xl
                bg-slate-800
                border
                border-white/[0.08]
              "
            />

            <button
              onClick={sendMessage}
              className="
                px-6
                py-3
                rounded-xl
                bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]
                hover:from-blue-500 hover:to-purple-500
              "
            >
              Send
            </button>
          </div>

        </div>

      </div>
    </DesktopLayout>
  );
}