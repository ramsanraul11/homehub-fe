import { useQuery } from "@tanstack/react-query";
import { membersApi } from "../api/membersApi";
import { memberKeys } from "./memberKey";

export function useMembers(householdId: string) {
    return useQuery({
        queryKey: memberKeys.list(householdId),
        queryFn: () => membersApi.list(householdId),
    });
}