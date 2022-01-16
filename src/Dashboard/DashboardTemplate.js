import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SpeedIcon from '@mui/icons-material/Speed';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import HandymanIcon from '@mui/icons-material/Handyman';
import FolderIcon from '@mui/icons-material/Folder';
import AddchartIcon from '@mui/icons-material/Addchart';
import TableChartIcon from '@mui/icons-material/TableChart';
import PrimarySearchAppBar from './NavBar';
import {DashboardData} from './DashboardData';
import { CopyrightDiv } from './CopyrightDiv';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor:"blue",
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  backgroundColor:"blue",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor:"white",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    })
  }),
);

const headerTheme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'white',
          fontSize: '9px',
          fontWeight: 'bold'
        },
      },
    },
    
  }
});

const addonTheme = createTheme({
  components: {
MuiListItem: {
  styleOverrides: {
    root: {
      '@media (max-width:425px)':{
        paddingLeft:'11px'
      }
    },
  },
}
}
});


const interfaceTheme = createTheme({
  components: {
MuiListItem: {
  styleOverrides: {
    root: {
      paddingLeft:'8px',
      '@media (max-width:425px)':{
        paddingLeft:'3px'
      }
    },
  },
}
}
});

function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
           <PrimarySearchAppBar/>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
        <ListItem>
          <ListItemIcon> 
        <EmojiEmotionsIcon fontSize="large" htmlColor="white"/>
              </ListItemIcon>
              <ListItemText>
            <h4 className='color-drawer'>SB ADMIN <sup>2</sup></h4>
            </ListItemText>
            </ListItem>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon htmlColor="white"/> : <ChevronLeftIcon htmlColor="white" />}
          </IconButton>
        </DrawerHeader>
        <Divider color="inherit" />
        <ListItem button key="Dashboard">
          <ListItemIcon>
        <SpeedIcon fontSize="medium" htmlColor="white"/>
              </ListItemIcon>
              <ListItemText className='color-drawer'>
              Dashboard
            </ListItemText>
            </ListItem>
            <Divider color="inherit" />
       {open? <ListItem>
            <ListItemText className='drawer-header'>
              INTERFACES
            </ListItemText>
            </ListItem>:
        <ThemeProvider theme={interfaceTheme}>
          <ListItem>
          <ThemeProvider theme={headerTheme}>
             <ListItemText>
              INTERFACES
            </ListItemText>
            </ThemeProvider>
          </ListItem>
          </ThemeProvider>
          
          }
        <List>
          {['Components','Utilities'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <SettingsApplicationsIcon htmlColor="white"/>:<HandymanIcon htmlColor="white"/>}
              </ListItemIcon>
              <ListItemText className='color-drawer' primary={text} />
              <IconButton>
              <ChevronRightIcon htmlColor="white"/>
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Divider color="inherit"/>
        {open?
        <ListItem>
        <ListItemText className='drawer-header'>
              ADDONS
            </ListItemText>
            </ListItem>:
          <ThemeProvider theme={addonTheme}>
              <ListItem>
              <ThemeProvider theme={headerTheme}>
              <ListItemText>
              ADDONS
            </ListItemText>
            </ThemeProvider>
            </ListItem>
            </ThemeProvider>
          }
        
        <List>
          {['Pages', 'Charts', 'Tables'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon className='color-drawer'>
                {index === 0 ? <FolderIcon className='color-drawer' /> : index === 1? <AddchartIcon className='color-drawer'/>:<TableChartIcon className='color-drawer'/>}
              </ListItemIcon>
              <ListItemText className='color-drawer' primary={text} />
              {index===0? <IconButton>
              <ChevronRightIcon className='color-drawer' />
              </IconButton>:""}
            </ListItem>
          ))}
        </List>
        <Divider color="inherit"/>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1,backgroundColor:"#E0E0E0",p:3}}>  
       <DrawerHeader />
        <DashboardData />
     </Box>
    </Box>
    <CopyrightDiv />
    </div>
  );
}

export {MiniDrawer};