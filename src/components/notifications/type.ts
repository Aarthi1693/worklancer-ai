export type NotificationRole = "provider" | "master";

export type NotificationCategory =
  | "APPLICATION"
  | "TASK"
  | "PAYMENT"
  | "AI"
  | "SYSTEM";

export interface NotificationItem {
  id: string;

  title: string;

  message: string;

  category: NotificationCategory;

  read: boolean;

  createdAt: string;

  actionUrl?: string;
}