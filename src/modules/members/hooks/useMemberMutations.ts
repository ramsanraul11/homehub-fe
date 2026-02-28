import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbarStore } from "../../../shared/ui/snackbarStore";
import { membersApi } from "../api/membersApi";
import type { AddMemberCommand } from "../types/members.types";
import { memberKeys } from "./memberKey";

export function useMemberMutations(householdId: string) {
    const qc = useQueryClient();
    const show = useSnackbarStore.getState().show;

    const invalidate = async () => {
        await qc.invalidateQueries({ queryKey: memberKeys.list(householdId) });
    };

    const addMember = useMutation({
        mutationFn: (cmd: AddMemberCommand) => membersApi.add(householdId, cmd),
        onSuccess: async () => { await invalidate(); show("Miembro añadido", "success"); },
        onError: () => show("No se pudo añadir el miembro", "error"),
    });

    const removeMember = useMutation({
        mutationFn: (memberId: string) => membersApi.remove(householdId, memberId),
        onSuccess: async () => {
            await invalidate();
            show("Miembro eliminado", "success");
        },
        onError: () => show("No se pudo eliminar el miembro", "error"),
    });

    return { addMember, removeMember };
}