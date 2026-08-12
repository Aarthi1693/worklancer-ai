"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import DesktopLayout from "@/components/layout/desktop-layout";

import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageList from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";
import SuggestedReplies from "@/components/chat/SuggestedReplies";
import EmptyChat from "@/components/chat/EmptyChat";

import chatService from "@/services/chat.service";
import { setChatUnreadTotal } from "@/lib/chatUnread";
import { getSocket } from "@/services/socket.service";

export default function MasterChatPage() {
  

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    const socket = getSocket();

    socket.on("receiveMessage", (msg) => {
      if (
        selectedConversation &&
        msg.conversationId === selectedConversation.id
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
  socket.off("receiveMessage");
};
  }, [selectedConversation]);

  async function loadConversations() {
    try {
      const user = JSON.parse(Cookies.get("user") || "{}");

      setCurrentUser(user);

      const data = await chatService.getConversations(user.id);

      setConversations(data);

      setChatUnreadTotal(
        (data || []).reduce(
          (sum: number, c: any) => sum + (c.unreadCount ?? 0),
          0
        )
      );

      const conversationId =
  typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("conversationId")
    : null;

      const target =
        data.find((c: any) => c.id === conversationId) ||
        data[0] ||
        null;

      if (target) {
        setSelectedConversation(target);

        getSocket().emit("joinConversation", {
          conversationId: target.id,
        });

        loadMessages(target.id);
      }
    } finally {
      setLoadingChats(false);
    }
  }

  async function loadMessages(id: string) {
    setLoadingMessages(true);

    const data = await chatService.getMessages(id);

    setMessages(data);

    setLoadingMessages(false);
  }

  async function sendMessage() {
    if (!message.trim()) return;

    setSending(true);

    await chatService.sendMessage({
      conversationId: selectedConversation.id,
      senderId: currentUser.id,
      message,
    });

    setMessage("");

    await loadMessages(selectedConversation.id);

    setSending(false);
  }

  return (
    <DesktopLayout>
      <div className="flex h-[calc(100vh-110px)] gap-6">

        <ChatSidebar
          conversations={conversations}
          selectedConversation={selectedConversation}
          currentUserId={currentUser?.id || ""}
          loading={loadingChats}
          onSelect={(conversation) => {
            setSelectedConversation(conversation);

            getSocket().emit("joinConversation", {
              conversationId: conversation.id,
            });

            loadMessages(conversation.id);
          }}
        />

        <div className="flex-1 bg-white rounded-3xl border shadow-sm flex flex-col overflow-hidden">

          {selectedConversation ? (
            <>
              <ChatHeader
                conversation={selectedConversation}
                currentUserId={currentUser?.id || ""}
              />

              <MessageList
                messages={messages}
                currentUserId={currentUser?.id || ""}
                loading={loadingMessages}
              />

              <SuggestedReplies
                onSelect={setMessage}
              />

              <ChatInput
                value={message}
                onChange={setMessage}
                onSend={sendMessage}
                loading={sending}
              />
            </>
          ) : (
            <EmptyChat />
          )}

        </div>
      </div>
    </DesktopLayout>
  );
}