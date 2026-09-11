import { api } from "./api";

export async function getWorkingCapital(
  getToken,
  businessId
) {
  return api.get(
    `/working-capital?businessId=${encodeURIComponent(
      businessId
    )}`,
    getToken
  );
}