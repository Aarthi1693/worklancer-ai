import { useEffect, useRef } from "react";
import {
  getSocket,
  submissionEvents,
  SubmissionEventPayload,
} from "@/services/socket.service";

interface UseSubmissionSocketOptions {
  onCreated?: (payload: SubmissionEventPayload) => void;
  onUpdated?: (payload: SubmissionEventPayload) => void;
}

export function useSubmissionSocket({
  onCreated,
  onUpdated,
}: UseSubmissionSocketOptions = {}) {
  const onCreatedRef = useRef(onCreated);
  const onUpdatedRef = useRef(onUpdated);

  useEffect(() => {
    onCreatedRef.current = onCreated;
    onUpdatedRef.current = onUpdated;
  }, [onCreated, onUpdated]);

  useEffect(() => {
    const socket = getSocket();

    const handleCreated = (payload: SubmissionEventPayload) =>
      onCreatedRef.current?.(payload);
    const handleUpdated = (payload: SubmissionEventPayload) =>
      onUpdatedRef.current?.(payload);

    socket.on(submissionEvents.CREATED, handleCreated);
    socket.on(submissionEvents.UPDATED, handleUpdated);

    return () => {
      socket.off(submissionEvents.CREATED, handleCreated);
      socket.off(submissionEvents.UPDATED, handleUpdated);
    };
  }, []);
}
