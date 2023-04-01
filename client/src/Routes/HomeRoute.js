import styles from "./HomeRoute.module.css";
import Universe from "../components/Universe.mjs";
import PropTypes from 'prop-types';
import Fixtures from "../components/Fixtures.mjs";
import SwitchButton from "../components/SwitchButton.mjs";
import { BsThreeDots } from "react-icons/bs";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import { Card, Icon, Paper, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Toolbar from '@mui/material/Toolbar';
import Switch from '@mui/material/Switch';
import { useEffect, useState } from "react";
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import useUniverseState from "../store";
import LightbulbIcon from '@mui/icons-material/Lightbulb';


const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: green[300],
      '&:hover': {
        backgroundColor: alpha(green[300], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: green[300],
    },
  }));
  
export default function HomeRoute(){
    const universe = useUniverseState();
    const [universeOutput, setUniverseOutput] = useState(true);
    const [settingsOpen, setSettingsOpen] = useState(false);
    

    const handleChange = (e) => {
        setUniverseOutput(e.target.checked)
        // TODO: Send request to server that switches entire universe off
    }

    const handleClick = () => {

    };

    const handleClickOpen = () => {
        setSettingsOpen(true);
    };
    
    const handleClose = (value) => {
        setSettingsOpen(false);
    }


    const handleFixtureToggle = (e) => {
        universe.toggleFixtureState(!e.target.checked, e.target.id.split("-")[1]);
        // send request to server to toggle the fixture state
        // at fixture index i of universe

    }

    return (
        <Stack sx={{width: "100%"}} rowGap="1rem">
            <AppBar component="nav" sx={{
                flexDirection: "row",
                justifyContent: "space-between", 
                alignItems: "center", 
                padding: "0rem 0.5rem",
                opacity: "90%"
            }} position="sticky">
                <Typography variant="h5" component="div">
                    Werkstatt
                </Typography>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleClickOpen}
                    >
                        <MoreVertOutlinedIcon />
                    </IconButton>
                    <UniverseDialog
                        open={settingsOpen}
                        onClose={handleClose}
                    />
                    <GreenSwitch checked={universeOutput} onChange={handleChange}/>
                </Toolbar>
            </AppBar>
            <Stack>
                <Typography variant="h6" component="div">Lampen</Typography>
                {
                    universe.fixtures != null ? universe.fixtures.map((fixture) => {
                        return <Card key={fixture.id} id={`fixture-${fixture.id}-card`} sx={{display: "flex", flexDirection: "column"}}>
                            <Box sx={{display: "flex"}}>
                                <LightbulbIcon/>
                                <Typography component="h3">
                                    {fixture.name}
                                </Typography>
                                <Switch checked={fixture.on} id={`fixture-${fixture.id}-switch`} onChange={handleFixtureToggle}></Switch>
                            </Box>
                        </Card>
                    })
                    : "Keine Lampen"
                }
            </Stack>
        </Stack>/*
        <div className={styles.home}>
            <div id={styles.header}>
                <h1>Werkstatt</h1>
                <div id={styles.header_control}>
                    <div id={styles.header_settings}>
                        <BsThreeDots/>
                    </div>
                    <div id={styles.header_toggle_all}>
                        <SwitchButton/>
                    </div>
                </div>
            </div>
            <div id={styles.main}>
                <div className={styles.universe_container}>
                    <h3>Universum</h3>
                    <Universe channels={channels}/> 
                </div>

                <div className={styles.fixture_container}>
                    <h3>Lampen</h3>
                    <Fixtures fixtures={fixtures}/>
                </div>
            </div>
        </div>
        */);
}

function UniverseDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <List>
                <ListItem addFixture>
                    <ListItemButton
                        autoFocus
                        onClick={() => handleListItemClick('addFixture')}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Lampe hinzufügen" />
                    </ListItemButton>
                </ListItem>

                <ListItem addGroup>
                    <ListItemButton
                        autoFocus
                        onClick={() => handleListItemClick('addGroup')}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Gruppe erstellen" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    );
}

UniverseDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };