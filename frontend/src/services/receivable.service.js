import { api } from "./api";

export async function getReceivables(
  getToken,
  businessId
) {
  return api.get(
    `/receivables?businessId=${encodeURIComponent(
      businessId
    )}`,
    getToken
  );
}

export async function createReceivable(
  getToken,
  receivableData
) {
  return api.post(
    "/receivables",
    receivableData,
    getToken
  );
}

export async function updateReceivable(
  getToken,
  receivableId,
  receivableData
) {
  return api.put(
    `/receivables/${receivableId}`,
    receivableData,
    getToken
  );
}

export async function deleteReceivable(
  getToken,
  receivableId
) {
  return api.remove(
    `/receivables/${receivableId}`,
    getToken
  );
}