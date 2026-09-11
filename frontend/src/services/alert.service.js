import { api } from "./api";

export async function getRiskAnalysis(
  getToken,
  businessId
) {
  return api.get(
    `/alerts/risk?businessId=${encodeURIComponent(
      businessId
    )}`,
    getToken
  );
}