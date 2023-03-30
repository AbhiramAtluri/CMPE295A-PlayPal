import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import StadiumIcon from '@mui/icons-material/Stadium';
import HistoryIcon from '@mui/icons-material/History';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{"marginTop":"10px"}}>
        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => ( */}
          <ListItem disablePadding key={"inbox"}>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon></InboxIcon>
              </ListItemIcon>
              <ListItemText primary={"Inbox"}/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding key={"venue"}>
            <ListItemButton>
              <ListItemIcon>
                <StadiumIcon></StadiumIcon>
              </ListItemIcon>
              <ListItemText primary={"Venue"}/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding key={"History"}>
            <ListItemButton>
              <ListItemIcon>
                <HistoryIcon></HistoryIcon>
              </ListItemIcon>
              <ListItemText primary={"History"}/>
            </ListItemButton>
          </ListItem>


        {/* // ))} */}
      </List>
      <Divider />
      <List>
        {/* {['All mail', 'Trash', 'Spam'].map((text, index) => ( */}
          <ListItem key={"Profile"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                 <AccountBoxIcon /> 
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItemButton>
          </ListItem>
        {/* // ))} */}
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <DragIndicatorIcon onClick={toggleDrawer(anchor, true)}>{anchor}</DragIndicatorIcon>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
