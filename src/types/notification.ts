export interface NotificationData {
  id: string | number;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: string;
  [key: string]: unknown;
}

export interface NotificationStatsValue {
  total: number;
  unread: number;
  readToday: number;
  pendingActions: number;
}

export type NotificationEventType =
  | "New Application"
  | "Applicant Accepted"
  | "Work Submitted"
  | "Work Approved"
  | "Work Rejected"
  | "Revision Requested";
