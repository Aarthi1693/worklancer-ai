import { useEffect, useRef } from "react";
import {
  getSocket,
  notificationEvents,
  NotificationEventPayload,
} from "@/services/socket.service";
import type { NotificationData } from "@/types/notification";

interface UseNotificationSocketOptions {
  userId?: string;
  onNewNotification?: (notification: NotificationData) => void;
  onNotificationRead?: (id: string) => void;
  onNotificationDeleted?: (id: string) => void;
}

const domainEvents = [
  notificationEvents.NEW_APPLICATION,
  notificationEvents.APPLICANT_ACCEPTED,
  notificationEvents.WORK_SUBMITTED,
  notificationEvents.WORK_APPROVED,
  notificationEvents.WORK_REJECTED,
  notificationEvents.REVISION_REQUESTED,
];

function resolveId(payload: NotificationEventPayload): string | undefined {
  return payload.notification?.id ?? payload.id;
}

function matchesUser(payload: NotificationEventPayload, userId?: string) {
  if (!userId) return true;
  const target = payload.userId ?? payload.recipientId;
  return !target || target === userId;
}

function toNotification(
  payload: NotificationEventPayload,
  sourceEvent?: string,
): NotificationData {
  const base = payload.notification ?? payload;
  return {
    id: base.id ?? `socket-${Date.now()}`,
    title: base.title ?? "",
    description: base.description ?? "",
    time: base.time ?? new Date().toLocaleString(),
    unread: base.unread !== undefined ? base.unread : true,
    type: base.type ?? sourceEvent ?? "system",
  };
}

export function useNotificationSocket({
  userId,
  onNewNotification,
  onNotificationRead,
  onNotificationDeleted,
}: UseNotificationSocketOptions = {}) {
  const newRef = useRef(onNewNotification);
  const readRef = useRef(onNotificationRead);
  const deletedRef = useRef(onNotificationDeleted);

  useEffect(() => {
    newRef.current = onNewNotification;
    readRef.current = onNotificationRead;
    deletedRef.current = onNotificationDeleted;
  }, [onNewNotification, onNotificationRead, onNotificationDeleted]);

  useEffect(() => {
    const socket = getSocket();

    const handleNew = (payload: NotificationEventPayload) => {
      if (!matchesUser(payload, userId)) return;
      newRef.current?.(toNotification(payload, notificationEvents.NEW_NOTIFICATION));
    };

    const handleRead = (payload: NotificationEventPayload) => {
      if (!matchesUser(payload, userId)) return;
      const id = resolveId(payload);
      if (id) readRef.current?.(String(id));
    };

    const handleDeleted = (payload: NotificationEventPayload) => {
      if (!matchesUser(payload, userId)) return;
      const id = resolveId(payload);
      if (id) deletedRef.current?.(String(id));
    };

    const handleDomain =
      (eventName: string) => (payload: NotificationEventPayload) => {
        if (!matchesUser(payload, userId)) return;
        newRef.current?.(toNotification(payload, eventName));
      };

    socket.on(notificationEvents.NEW_NOTIFICATION, handleNew);
    socket.on(notificationEvents.NOTIFICATION_READ, handleRead);
    socket.on(notificationEvents.NOTIFICATION_DELETED, handleDeleted);
    domainEvents.forEach((event) => socket.on(event, handleDomain(event)));

    return () => {
      socket.off(notificationEvents.NEW_NOTIFICATION, handleNew);
      socket.off(notificationEvents.NOTIFICATION_READ, handleRead);
      socket.off(notificationEvents.NOTIFICATION_DELETED, handleDeleted);
      domainEvents.forEach((event) => socket.off(event, handleDomain(event)));
    };
  }, [userId]);
}
