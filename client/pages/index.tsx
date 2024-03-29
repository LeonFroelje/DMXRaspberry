import { Inter } from 'next/font/google'
import PropTypes from 'prop-types';
import useUniverseState from '@/store'
import { ChangeEvent, useState } from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import { Card, Slider, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Toolbar from '@mui/material/Toolbar';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import Fixture from '@/src/types/fixture';
import FixtureCard from '@/src/components/fixturecard';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [universeOutput, setUniverseOutput] = useState(true);
  const universeState = useUniverseState();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // if (e.target.checked) {

    // }
    // TODO: Send request to server that switches entire universe off
  }

  const handleClick = () => {

  };

  const handleClickOpen = () => {
    setSettingsOpen(true);
  };

  const handleClose = (value: boolean) => {
    setSettingsOpen(false);
  }


  return (
    <Stack sx={{ width: "100%" }} rowGap="1rem">
      <AppBar component="nav" sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0rem 0.5rem",
        opacity: "90%"
      }} position="sticky">
        <Typography variant="h5" component="div">
          {universeState.name}
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
          <GreenSwitch checked={universeOutput} onChange={handleChange} />
        </Toolbar>
      </AppBar>
      <Stack flexDirection={"column"} padding={"1rem"}>
        <Box>
          <Typography variant="h6" component="div">Lampen</Typography>
          <Stack gap={".5rem"}>
            {
              universeState.fixtures !== undefined ? universeState.fixtures.map((fixture, index) => {
                return <FixtureCard fixture={fixture} index={index} key={fixture.id}/>
              })
                : "Keine Lampen"
            }
          </Stack>
        </Box>
        <Box>
          <Typography variant='h6' component={"div"}>Gruppen</Typography>
          <Typography variant='h6' component={"div"}>jksadjalsjdska</Typography>
        </Box>
      </Stack>
    </Stack>
  )
}

type universeDialogProps = {
  onClose: Function,
  selectedValue?: string,
  open: boolean
}

function UniverseDialog(props: universeDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
      onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
      onClose(value);
  };

  return (
      <Dialog onClose={handleClose} open={open}>
          <List>
              <ListItem>
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

              <ListItem>
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