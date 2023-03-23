import styles from "./HomeRoute.module.css";
import Universe from "../components/Universe.mjs";
import PropTypes from 'prop-types';
import Fixtures from "../components/Fixtures.mjs";
import SwitchButton from "../components/SwitchButton.mjs";
import { BsThreeDots } from "react-icons/bs";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import { Icon, Paper, Typography } from "@mui/material";
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
import { useState } from "react";
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';


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
    const [checked, setChecked] = useState(true);
    const [open, setOpen] = useState(false);

    const channels = [];
    for(let i = 1; i <= 512; i++){
        channels.push({
            id: i,
            fixtureName: ""
        })
    }
    const fixtures = [];

    const handleChange = (e) => {
        setChecked(e.target.checked)
    }

    const handleClick = () => {

    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = (value) => {
        setOpen(false);
    }

    return (
        <Stack sx={{width: "100%"}} rowGap="1rem">
            <AppBar component="nav" sx={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "0rem 0.5rem",
            opacity: "90%"}} position="sticky">
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
                        open={open}
                        onClose={handleClose}
                    />
                    <GreenSwitch checked={checked} onChange={handleChange}/>
                </Toolbar>
            </AppBar>
            <Stack>
                <Typography variant="h6" component="div">Lampen</Typography>
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