import { api } from "./api";

export async function sendAIMessage(
  getToken,
  businessId,
  message
) {
  return api.post(
    "/ai/chat",
    {
      businessId,
      message,
    },
    getToken
  );
}