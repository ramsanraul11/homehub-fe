export const memberKeys = {
    all: ["members"] as const,
    list: (householdId: string) => ["members", householdId, "list"] as const,
};