import { httpClient } from "../../../infrastructure/http/httpClient";

export type HouseholdDto = {
  id: string;
  name: string;
  currencyCode?: string | null;
  // muy probable que venga el rol por usuario:
  role?: number; // 1 Owner, 2 Admin, 3 Member (según tu enum)
};

export const householdsApi = {
  getMine: async () => {
    const { data } = await httpClient.get<HouseholdDto[]>("/households");
    return data;
  },

  getById: async (householdId: string) => {
    const { data } = await httpClient.get<HouseholdDto>(`/households/${householdId}`);
    return data;
  },
};