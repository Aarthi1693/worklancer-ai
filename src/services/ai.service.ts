import api from "@/lib/api";

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  success: boolean;
  response: string;
}

export async function sendMessage(
  message: string
): Promise<ChatResponse> {
  const { data } = await api.post("/ai/chat", {
    message,
  });

  return data;
}