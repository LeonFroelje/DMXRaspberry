import useUniverseState from "@/store";
import { AppBar, Card, CardHeader, Divider, IconButton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

export default function Program(){
    const universeState = useUniverseState();
    console.log(universeState.mode);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <Stack>
            <AppBar component="nav" sx={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: "0.5rem 0.5rem",
                opacity: "90%"
            }} position="sticky">
                {(universeState.mode.Programming === null || universeState.mode.Programming === undefined) 
                    ? 
                    <Card>
                        <TextField color="secondary" id="program-name" label="Programmname" variant="filled"
                            InputProps={{endAdornment:  
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        margin: "0",
                                        padding: "0rem 0rem 0rem 0.3rem"
                                    }}
                                >
                                    <SaveIcon/>
                                </IconButton>
                            }}
                        />
                    </Card>
                    : 
                    <Card>
                        <TextField id="program-name" label={universeState.mode.Programming} variant="filled"/>                        
                    </Card>
                    }
                    <Card>
                        <IconButton aria-label="Öffnen">
                            <FolderOpenIcon></FolderOpenIcon>
                        </IconButton>
                    </Card>
            </AppBar>
            <Stack direction={"column"}
            justifyContent={"space-evenly"}>
                <Typography variant="h6">
                    Szenen
                </Typography>
            </Stack>
        </Stack>
        )
}