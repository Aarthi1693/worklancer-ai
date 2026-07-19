import api from "@/lib/api";

export const NotificationService = {
  async getNotifications(userId: string) {
    const res = await api.get(`/notifications/${userId}`);
    return res.data;
  },

  async markAsRead(id: string) {
    return api.patch(`/notifications/${id}/read`);
  },

  async markAll(userId: string) {
    return api.patch(`/notifications/read-all/${userId}`);
  },
};