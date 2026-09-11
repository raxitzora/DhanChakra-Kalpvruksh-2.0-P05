import { api } from "./api";

export async function sendAIMessage(getToken, message) {
  return api.post(
    "/ai/chat",
    {
      message,
    },
    getToken
  );
}