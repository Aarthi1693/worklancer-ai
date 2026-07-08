"use client";

import { useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";

const providers = [
  {
    id: 1,
    name: "Aarthi",
    company: "WorkLancer AI",
    online: true,
  },
  {
    id: 2,
    name: "John David",
    company: "Tech Solutions",
    online: true,
  },
  {
    id: 3,
    name: "Priya Technologies",
    company: "Digital Agency",
    online: false,
  },
];

export default function MasterChatPage() {
  const [selectedProvider, setSelectedProvider] =
    useState(providers[0]);

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([
      {
        sender: "Aarthi",
        text: "Can you provide today's project update?",
      },
      {
        sender: "Task Master",
        text: "Yes, the first milestone has been completed.",
      },
    ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        sender: "Task Master",
        text: message,
      },
    ]);

    setMessage("");
  };

  return (
    <DesktopLayout>
      <div className="h-[85vh] flex gap-6">

        {/* Providers List */}

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
            Providers
          </h2>

          <div className="space-y-3">

            {providers.map((provider) => (

              <div
                key={provider.id}
                onClick={() =>
                  setSelectedProvider(provider)
                }
                className="
                  p-4
                  rounded-2xl
                  cursor-pointer
                  hover:bg-slate-800
                  transition
                "
              >
                <div className="flex justify-between">

                  <div>
                    <h3 className="font-semibold">
                      {provider.name}
                    </h3>

                    <p className="text-sm text-slate-400">
                      {provider.company}
                    </p>
                  </div>

                  <div
                    className={`w-3 h-3 rounded-full ${
                      provider.online
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

          {/* Chat Header */}

          <div
            className="
              p-6
              border-b
              border-white/[0.08]
            "
          >
            <h2 className="text-2xl font-bold">
              {selectedProvider.name}
            </h2>

            <p className="text-slate-400">
              {selectedProvider.company}
            </p>
          </div>

          {/* Messages */}

          <div className="flex-1 p-6 overflow-y-auto space-y-4">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.sender === "Task Master"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md px-5 py-3 rounded-2xl ${
                    msg.sender === "Task Master"
                       ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                      : "bg-slate-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>

            ))}

          </div>

          {/* AI Suggestions */}

          <div className="px-6 pb-3">

            <p className="text-sm text-slate-400 mb-3">
              AI Suggested Replies
            </p>

            <div className="flex gap-2 flex-wrap">

              <button
                onClick={() =>
                  setMessage(
                    "Project update received."
                  )
                }
                className="
                  px-3
                  py-2
                  rounded-xl
                  bg-slate-800
                "
              >
                Project Update
              </button>

              <button
                onClick={() =>
                  setMessage(
                    "Payment has been processed."
                  )
                }
                className="
                  px-3
                  py-2
                  rounded-xl
                  bg-slate-800
                "
              >
                Payment Processed
              </button>

              <button
                onClick={() =>
                  setMessage(
                    "Task completed successfully."
                  )
                }
                className="
                  px-3
                  py-2
                  rounded-xl
                  bg-slate-800
                "
              >
                Task Completed
              </button>

            </div>

          </div>

          {/* Message Input */}

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