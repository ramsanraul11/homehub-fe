import { httpClient } from "../../../infrastructure/http/httpClient";

export type HouseholdDto = {
  id: string;
  name: string;
  currencyCode?: string | null;
};

export type CreateHouseholdCommand = {
  name: string;
  currencyCode?: string | null;
};

export const householdsApi = {
  getMine: async () => {
    const { data } = await httpClient.get<HouseholdDto[]>("/households");
    return data;
  },

  create: async (cmd: CreateHouseholdCommand) => {
    const { data } = await httpClient.post<HouseholdDto>("/households", cmd);
    return data;
  },
};