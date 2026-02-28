import { HouseholdRole } from "../types/members.types";

export function roleLabel(role: HouseholdRole) {
    switch (role) {
        case HouseholdRole.Owner: return "Owner";
        case HouseholdRole.Admin: return "Admin";
        case HouseholdRole.Member: return "Member";
        default: return `Role ${role}`;
    }
}