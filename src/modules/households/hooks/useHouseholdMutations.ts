import { useMutation, useQueryClient } from "@tanstack/react-query";
import { householdsApi, type CreateHouseholdCommand } from "../api/householdsApi";
import { householdKeys } from "./useHouseholds";
import { useSnackbarStore } from "../../../shared/ui/snackbarStore";

export function useHouseholdMutations() {
  const qc = useQueryClient();
  const show = useSnackbarStore.getState().show;

  const createHousehold = useMutation({
    mutationFn: (cmd: CreateHouseholdCommand) => householdsApi.create(cmd),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: householdKeys.mine });
      show("Casa creada", "success");
    },
    onError: () => show("No se pudo crear la casa", "error"),
  });

  return { createHousehold };
}