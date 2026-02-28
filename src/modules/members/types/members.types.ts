export enum HouseholdRole {
    Owner = 1,
    Admin = 2,
    Member = 3,
}

export type MemberDto = {
    memberId: string;
    userId: string;
    role: HouseholdRole;
};

export type AddMemberCommand = {
    email: string;
    role: HouseholdRole;
};