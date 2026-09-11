import { api } from "./api";

export async function getForecast(
  getToken,
  businessId,
  days = 7
) {
  return api.get(
    `/forecast?businessId=${encodeURIComponent(
      businessId
    )}&days=${days}`,
    getToken
  );
}