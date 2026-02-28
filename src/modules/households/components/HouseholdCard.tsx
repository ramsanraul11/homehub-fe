import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { HouseholdDto } from "../api/householdsApi";
import { useHouseholdStore } from "../store/householdStore";

function shortId(id: string) {
    return `${id.slice(0, 6)}…${id.slice(-4)}`;
}

export function HouseholdCard({ household }: { household: HouseholdDto }) {
    const nav = useNavigate();
    const setActive = useHouseholdStore((s) => s.setActiveHouseholdId);
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);

    const open = () => {
        setActive(household.id);
        nav(`/app/${household.id}/dashboard`);
    };

    return (
        <Card
            sx={{
                borderRadius: 3,
                height: "100%",
                transition: "transform 120ms ease, box-shadow 120ms ease",
                "&:hover": { transform: { md: "translateY(-2px)" }, boxShadow: { md: 6 } },
            }}
        >
            <CardContent sx={{ p: 2.25, display: "flex", flexDirection: "column", gap: 1.25 }}>
                {/* Top row */}
                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1 }}>
                    <Box sx={{ minWidth: 0 }}>
                        <Typography fontWeight={900} noWrap>
                            {household.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            ID {shortId(household.id)}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {household.currencyCode && <Chip size="small" label={household.currencyCode} />}
                        <IconButton size="small" onClick={(e) => setAnchor(e.currentTarget)}>
                            <MoreVertIcon fontSize="small" />
                        </IconButton>
                    </Box>

                    <Menu open={!!anchor} anchorEl={anchor} onClose={() => setAnchor(null)}>
                        <MenuItem
                            onClick={() => {
                                setAnchor(null);
                                open();
                            }}
                        >
                            <ListItemIcon>
                                <OpenInNewIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Abrir" />
                        </MenuItem>

                        <MenuItem disabled>
                            <ListItemIcon>
                                <EditIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Editar (pendiente API)" />
                        </MenuItem>

                        <MenuItem disabled>
                            <ListItemIcon>
                                <DeleteOutlineIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Eliminar (pendiente API)" />
                        </MenuItem>
                    </Menu>
                </Box>

                {/* Spacer */}
                <Box sx={{ flex: 1 }} />

                {/* Primary action */}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="contained" onClick={open} sx={{ borderRadius: 3, px: 2.5 }}>
                        Abrir
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}