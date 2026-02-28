import { create } from "zustand";
import { persist } from "zustand/middleware";

type HouseholdState = {
    activeHouseholdId: string | null;
    setActiveHouseholdId: (id: string) => void;
    clear: () => void;
};

export const useHouseholdStore = create<HouseholdState>()(
    persist(
        (set) => ({
            activeHouseholdId: null,
            setActiveHouseholdId: (id) => set({ activeHouseholdId: id }),
            clear: () => set({ activeHouseholdId: null }),
        }),
        { name: "homehub.activeHousehold" }
    )
);