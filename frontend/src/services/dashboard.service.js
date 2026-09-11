import { api } from "./api";

export async function getDashboard(
  getToken,
  businessId
) {
  return api.get(
    `/dashboard?businessId=${encodeURIComponent(
      businessId
    )}`,
    getToken
  );
}