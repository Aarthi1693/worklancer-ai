import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    const token = Cookies.get("access_token");

    socket = io("http://localhost:5000", {
      transports: ["websocket"],
      auth: {
        token,
      },
    });
  }

  return socket;
}

export const chatEvents = {
  SEND_MESSAGE: "sendMessage",
  RECEIVE_MESSAGE: "receiveMessage",
  JOIN_CONVERSATION: "joinConversation",
  MESSAGE_SENT: "messageSent",
  MESSAGE_DELIVERED: "messageDelivered",
  MESSAGE_READ: "messageRead",
} as const;

export interface ChatEventPayload {
  conversationId?: string;
  message?: string;
  senderId?: string;
  [key: string]: unknown;
}

export function emitChatMessage(payload: ChatEventPayload) {
  getSocket().emit(chatEvents.SEND_MESSAGE, payload);
}

export interface SubmissionEventPayload {
  submissionId?: string;
  applicationId?: string;
  status?: string;
  feedback?: string;
  [key: string]: unknown;
}

export const submissionEvents = {
  CREATED: "submissionCreated",
  UPDATED: "submissionUpdated",
} as const;

export function emitSubmissionCreated(payload: SubmissionEventPayload) {
  getSocket().emit(submissionEvents.CREATED, payload);
}

export function emitSubmissionUpdated(payload: SubmissionEventPayload) {
  getSocket().emit(submissionEvents.UPDATED, payload);
}

export const notificationEvents = {
  NEW_NOTIFICATION: "notificationCreated",
  NOTIFICATION_READ: "notificationRead",
  NOTIFICATION_DELETED: "notificationDeleted",
  NEW_APPLICATION: "newApplication",
  APPLICANT_ACCEPTED: "applicantAccepted",
  WORK_SUBMITTED: "workSubmitted",
  WORK_APPROVED: "workApproved",
  WORK_REJECTED: "workRejected",
  REVISION_REQUESTED: "revisionRequested",
} as const;

export type NotificationEventType =
  (typeof notificationEvents)[keyof typeof notificationEvents];

export interface NotificationEventPayload {
  id?: string;
  type?: string;
  title?: string;
  description?: string;
  time?: string;
  unread?: boolean;
  userId?: string;
  recipientId?: string;
  notification?: {
    id?: string;
    type?: string;
    title?: string;
    description?: string;
    time?: string;
    unread?: boolean;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}
