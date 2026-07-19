import api from "@/lib/api";

const chatService = {
  getConversations(userId: string) {
    return api
      .get(`/chat/conversations/${userId}`)
      .then((res) => res.data);
  },

  getMessages(conversationId: string) {
    return api
      .get(`/chat/messages/${conversationId}`)
      .then((res) => res.data);
  },

  sendMessage(data: {
    conversationId: string;
    senderId: string;
    message: string;
  }) {
    return api
      .post("/chat/message", data)
      .then((res) => res.data);
  },

  createConversation(data: {
    projectId: string;
    providerId: string;
    masterId: string;
  }) {
    return api
      .post("/chat/conversation", data)
      .then((res) => res.data);
  },
};

export default chatService;