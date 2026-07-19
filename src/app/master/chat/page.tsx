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

export default function MasterChatPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const [conversationsLoading, setConversationsLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  async function loadConversations() {
    try {
      setConversationsLoading(true);
      const user = JSON.parse(Cookies.get("user") || "{}");

      setCurrentUser(user);

      const data = await chatService.getConversations(user.id);

      setConversations(data);

      setChatUnreadTotal(
        data.reduce(
          (sum: number, c: any) =>
            sum + (c.unreadCount ?? 0),
          0
        )
      );

      if (data.length > 0) {
        setSelectedConversation(data[0]);
        await loadMessages(data[0].id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setConversationsLoading(false);
    }
  }

  async function loadMessages(conversationId: string) {
    try {
      setMessagesLoading(true);
      const data = await chatService.getMessages(conversationId);
      setMessages(data);
    } catch (error) {
      console.log(error);
    } finally {
      setMessagesLoading(false);
    }
  }

  const sendMessage = async () => {
    if (!message.trim() || !selectedConversation) return;

    try {
      setSending(true);
      await chatService.sendMessage({
        conversationId: selectedConversation.id,
        senderId: currentUser.id,
        message,
      });

      setMessage("");

      await loadMessages(selectedConversation.id);
    } catch (err) {
      console.log(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <DesktopLayout>
      <div className="
        flex
        h-full
        gap-6
        overflow-hidden
      ">

        <ChatSidebar
          conversations={conversations}
          selectedConversation={selectedConversation}
          currentUserId={currentUser?.id || ""}
          onSelect={(conversation) => {
            setSelectedConversation(conversation);
            loadMessages(conversation.id);
          }}
          loading={conversationsLoading}
        />

        <div
          className="
            flex-1
            flex
            flex-col
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
          "
        >
          {selectedConversation ? (
            <>
              <ChatHeader
                conversation={selectedConversation}
                currentUserId={currentUser?.id || ""}
              />

              <MessageList
                messages={messages}
                currentUserId={currentUser?.id || ""}
                loading={messagesLoading}
              />

              <SuggestedReplies
                onSelect={(reply) => setMessage(reply)}
              />

              <ChatInput
                onSend={sendMessage}
                value={message}
                onChange={setMessage}
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
