import { api } from "./api";

export async function getBusinesses(getToken) {
  return api.get("/businesses", getToken);
}

export async function createBusiness(getToken, businessData) {
  return api.post("/businesses", businessData, getToken);
}