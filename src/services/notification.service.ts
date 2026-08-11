import api from "@/lib/api";

export interface NotificationData {
  id: string;
  title: string;
  description: string;
  type: string;
  unread: boolean;
  time: string;
}

export const NotificationService = {
  async getNotifications(userId: string) {
    const res = await api.get(`/notifications/${userId}`);
    return this.normalize(res.data);
  },

  async markAsRead(id: string) {
    return api.patch(`/notifications/${id}/read`);
  },

  async markAll(userId: string) {
    return api.patch(`/notifications/read-all/${userId}`);
  },

  async deleteNotification(id: string) {
    return api.delete(`/notifications/${id}`);
  },

  normalize(data: any): NotificationData[] {
    if (!Array.isArray(data)) return [];

    return data.map((item: any) => ({
      id: item.id,

      title: item.title,

      description: item.message,

      type: item.type,

      unread: !item.isRead,

      time: new Date(item.createdAt).toLocaleString(),
    }));
  },
};