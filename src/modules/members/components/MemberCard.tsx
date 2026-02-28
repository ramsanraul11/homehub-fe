import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useMemberMutations } from "../hooks/useMemberMutations";
import { HouseholdRole, type MemberDto } from "../types/members.types";

function roleLabel(role: HouseholdRole) {
    switch (role) {
        case HouseholdRole.Owner: return "Owner";
        case HouseholdRole.Admin: return "Admin";
        case HouseholdRole.Member: return "Member";
        default: return `Role ${role}`;
    }
}

function shortId(id: string) {
    return `${id.slice(0, 6)}…${id.slice(-4)}`;
}

function initialsFromUserId(userId: string) {
    return userId.slice(0, 2).toUpperCase();
}

export function MemberCard({
    member,
    householdId,
}: {
    member: MemberDto;
    householdId: string;
}) {
    const { removeMember } = useMemberMutations(householdId);
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);

    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ width: 44, height: 44 }}>
                    {initialsFromUserId(member.userId)}
                </Avatar>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography fontWeight={800} noWrap>
                        Usuario {shortId(member.userId)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                        Member {shortId(member.memberId)}
                    </Typography>

                    <Box sx={{ mt: 0.8 }}>
                        <Chip size="small" label={roleLabel(member.role)} />
                    </Box>
                </Box>

                <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
                    <MoreVertIcon />
                </IconButton>

                <Menu open={!!anchor} anchorEl={anchor} onClose={() => setAnchor(null)}>
                    <MenuItem
                        onClick={() => {
                            setAnchor(null);
                            removeMember.mutate(member.memberId); // ✅ memberId
                        }}
                    >
                        Eliminar
                    </MenuItem>
                </Menu>
            </CardContent>
        </Card>
    );
}