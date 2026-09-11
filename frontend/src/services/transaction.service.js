import { api } from "./api";

export async function getTransactions(getToken, businessId) {
  return api.get(
    `/transactions?businessId=${encodeURIComponent(businessId)}`,
    getToken
  );
}

export async function createTransaction(
  getToken,
  transactionData
) {
  return api.post(
    "/transactions",
    transactionData,
    getToken
  );
}

export async function updateTransaction(
  getToken,
  transactionId,
  transactionData
) {
  return api.put(
    `/transactions/${transactionId}`,
    transactionData,
    getToken
  );
}

export async function deleteTransaction(
  getToken,
  transactionId
) {
  return api.remove(
    `/transactions/${transactionId}`,
    getToken
  );
}