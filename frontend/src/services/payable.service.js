import { api } from "./api";

export async function getPayables(getToken, businessId) {
  return api.get(
    `/payables?businessId=${encodeURIComponent(businessId)}`,
    getToken
  );
}

export async function createPayable(getToken, payableData) {
  return api.post("/payables", payableData, getToken);
}

export async function updatePayable(
  getToken,
  payableId,
  payableData
) {
  return api.put(
    `/payables/${payableId}`,
    payableData,
    getToken
  );
}

export async function deletePayable(
  getToken,
  payableId
) {
  return api.remove(
    `/payables/${payableId}`,
    getToken
  );
}