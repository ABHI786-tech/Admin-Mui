import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import NewNavbar from '../components/NewNavbar';


//  react icons 
import { MdDashboard } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { FaUsersLine } from 'react-icons/fa6'
import { BiAddToQueue } from "react-icons/bi";
import { IoMailOpenOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { authSlicePath } from '../redux/slice/authSlice';

const drawerWidth = 220;




const openedMixin = (theme) => ({
    width: drawerWidth,
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
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);


//  mini Drawer  mai function
export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(null);
    const user = useSelector(authSlicePath)

const navigate = useNavigate()

 React.useEffect(() => {
        if (!user) {
            navigate("/login")
        } else {
            setLoading(false)
        }
    },
        [user])


    const SidebarItemList = [{
        id: 1,
        name: 'Dashboard',
        link: '/',
        Icon: <MdDashboard />
    },
    {
        id: 2,
        name: 'Add Employee',
        link: '/addemployee',
        Icon: <FaUser/>
    }, {
        id: 3,
        name: 'All Employee',
        link: '/allemployee',
        Icon: <FaUsersLine/>
    },
    {
        id: 4,
        name: 'Add rights',
        link: '/addrights',
        Icon: <BiAddToQueue/>
    },
    {
        id: 5,
        name: 'All rights',
        link: '/rights/populate',
        Icon: <IoMailOpenOutline/>
    },
    ]


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                marginRight: 6,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                     <Typography variant="h6" noWrap component="div">
                       Employee Management Service
                    </Typography>
                        {/* <DrawerAppBar /> */}
                        <NewNavbar sx={{width: "full"}} />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {SidebarItemList.map((text, index) => (
                        <ListItem key={text.id} disablePadding sx={{ display: 'block', margin: "2px" }}>
                            <ListItemButton
                                onClick={() => {navigate(text.link); setActiveIndex(index)}}
                                sx={[
                                    {
                                        minHeight: 48,
                                        px: 2.5,
                                        top: 25,
                                        borderRadius: '12px',
                                        mx: 1,
                                        // ✅ ONLY BACKGROUND CHANGE
                                        backgroundColor:
                                            activeIndex === text.link ? 'action.selected' : 'transparent',

                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                    },
                                    open
                                        ? {
                                            justifyContent: 'initial',
                                        }
                                        : {
                                            justifyContent: 'center',
                                        },
                                ]}
                            >
                                <ListItemIcon
                                    sx={[
                                        {
                                            fontSize:"22px",
                                            fontWeight:700,
                                            minWidth: 0,
                                            justifyContent: 'center',
                                            color: activeIndex === index ? 'primary.main' : 'text.secondary',
                                        },
                                        open
                                            ? {
                                                mr: 3,
                                            }
                                            : {
                                                mr: 'auto',
                                            },
                                    ]}
                                >
                                 {text.Icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={text.name}
                                    sx={[{
                                        color: activeIndex === index ? 'primary.main' : 'text.secondary',

                                    },
                                    open
                                        ? {
                                            opacity: 1,
                                        }
                                        : {
                                            opacity: 0,
                                        },
                                    ]}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>

            {/* main content of the page  */}
            <Box
                component="main"
                sx={{
                    margin: "5%",
                    flexGrow: 1,
                    minWidth: 0,          // 🔥 very important for responsiveness
                    p: { xs: 1, sm: 2, md: 3 },
                    overflowX: 'hidden',
                }}
            >
                <DrawerHeader />
                <Outlet />
                
            </Box>
        </Box>
    );
}