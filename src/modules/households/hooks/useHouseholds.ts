import { useQuery } from "@tanstack/react-query";
import { householdsApi } from "../api/householdsApi";

export const householdKeys = {
    mine: ["households", "mine"] as const,
    byId: (id: string) => ["households", id] as const,
};

export function useHouseholds() {
    return useQuery({
        queryKey: householdKeys.mine,
        queryFn: householdsApi.getMine,
    });
}