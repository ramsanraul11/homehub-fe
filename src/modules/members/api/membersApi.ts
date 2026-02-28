import { httpClient } from "../../../infrastructure/http/httpClient";
import type { AddMemberCommand, MemberDto } from "../types/members.types";

export const membersApi = {
    list: async (householdId: string) => {
        const { data } = await httpClient.get<MemberDto[]>(
            `/households/${householdId}/members`
        );
        return data;
    },

    add: async (householdId: string, cmd: AddMemberCommand) => {
        // swagger: POST /households/{householdId}/members
        await httpClient.post(`/households/${householdId}/members`, cmd);
    },

    remove: async (householdId: string, memberId: string) => {
        await httpClient.delete(`/households/${householdId}/members/${memberId}`);
    },
};