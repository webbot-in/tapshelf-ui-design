import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Drawer, List, ListItem, ListItemButton, Stack, Typography } from '@mui/material'
import DashboardIconBlack from './images/blackicons/dashboardblack.png'
import InventoryIconBlack from './images/blackicons/inventoryblack.png'
import ReportsIconBlack from './images/blackicons/reportsblack.png'
import SuppliersIconBlack from './images/blackicons/suppliersblack.png'
import OrdersIconBlack from './images/blackicons/ordersblack.png'
import ManageStoreIconBlack from './images/blackicons/managestoreblack.png'
import SettingsIconBlack from './images/blackicons/settingsblack.png'
import LogoutIconBlack from './images/blackicons/logoutblack.png'

import DashboardIconBlue from './images/blueicons/dashboardblue.png'
import InventoryIconBlue from './images/blueicons/inventoryblue.png'
import ReportsIconBlue from './images/blueicons/reportsblue.png'
import SuppliersIconBlue from './images/blueicons/suppliersblue.png'
import OrdersIconBlue from './images/blueicons/ordersblue.png'
import ManageStoreIconBlue from './images/blueicons/managestoreblue.png'
import SettingsIconBlue from './images/blueicons/settingsblue.png'
import LogoutIconBlue from './images/blueicons/logoutblue.png'
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery, createTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack'

const theme = createTheme();

function DrawerLeft(props) {
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

    console.log(window.location.pathname)
    const paths = {
        '0': '/dashboard',
        '1': '/',
        '2': '/reports',
        '3': '/suppliers',
        '4': '/orders',
        '5': '/managestore',
        '6': '/settings',
    }
    const navigate = useNavigate()
    const MenuItemsList = [
        {
            text: "Dashboard",
            icon: window.location.pathname === paths['0'] ? DashboardIconBlue : DashboardIconBlack,
            reDirect: () => navigate(paths['0'])
        },
        {
            text: "Inventory",
            icon: window.location.pathname === paths['1'] ? InventoryIconBlue : InventoryIconBlack,
            reDirect: () => navigate(paths['1'])
        },
        {
            text: "Reports",
            icon: window.location.pathname === paths['2'] ? ReportsIconBlue : ReportsIconBlack,
            reDirect: () => navigate(paths['2'])
        },
        {
            text: "Suppliers",
            icon: window.location.pathname === paths['3'] ? SuppliersIconBlue : SuppliersIconBlack,
            reDirect: () => navigate(paths['3'])
        },
        {
            text: "Orders",
            icon: window.location.pathname === paths['4'] ? OrdersIconBlue : OrdersIconBlack,
            reDirect: () => navigate(paths['4'])
        },
        {
            text: "Manage Store",
            icon: window.location.pathname === paths['5'] ? ManageStoreIconBlue : ManageStoreIconBlack,
            reDirect: () => navigate(paths['5'])
        },
        {
            text: "Settings",
            icon: window.location.pathname === paths['6'] ? SettingsIconBlue : SettingsIconBlack,
            reDirect: () => navigate(paths['6'])
        },
        {
            text: "Log Out",
            icon: window.location.pathname === paths['7'] ? LogoutIconBlue : LogoutIconBlack,
            reDirect: () => enqueueSnackbar('No Logout', { variant: 'error', preventDuplicate: true })
        }
    ];

    return (
        <Drawer
            sx={{
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: { md: 190, lg: 220 },
                },
            }}
            variant="persistent"
            anchor="left"
            open={matchesMD ? props.openDrawer : true}
        >
            <Box mt={{ xs: 0.2, sm: 3 }}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ color: '#5294F3', ml: 2.7, mt: { xs: 2, sm: 'initial' } }}>
                    <Typography variant='h5' sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Tapshelf</Typography>
                    <CloseIcon onClick={props.closeDrawer} sx={{ mr: 1, display: { xs: 'initial', md: 'none' } }} />
                </Stack>
                <List sx={{ mt: { xs: 1, sm: 2 } }}>
                    {MenuItemsList.slice(0, 6).map((obj, index) => (
                        <ListItem key={index} disablePadding >
                            <ListItemButton
                                onClick={obj.reDirect}
                            >
                                <Stack direction={"row"} alignItems={"center"} gap={2} sx={{ p: 1, }} >
                                    <Box component={"img"} src={obj.icon} sx={{ width: "20px", height: "20px", }} />
                                    {/* {obj.icon} */}
                                    <Typography
                                        sx={{ fontFamily: "Poppins", color: window.location.pathname === paths[`${index}`] ? '#2C7DF0' : '#666F81', fontSize: 16, mt: 0.5, }}
                                    >{obj.text}</Typography>

                                </Stack>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>


                <List sx={{ position: "absolute", bottom: { xs: 5, sm: 2 }, width: "100%", overflow: "hidden" }}>
                    {MenuItemsList.slice(6).map((obj, index) => (
                        <ListItem key={index} disablePadding >
                            <ListItemButton
                                onClick={obj.reDirect}
                            >
                                <Stack direction={"row"} alignItems={"center"} gap={2} sx={{ p: 1, }}>
                                    <Box component={"img"} src={obj.icon} sx={{ width: "20px", height: "20px", }} />
                                    <Typography sx={{ fontFamily: "Poppins", color: window.location.pathname === paths[`${index + 6}`] ? '#2C7DF0' : '#666F81', fontSize: 16, mt: 0.5, }}>{obj.text}</Typography>
                                </Stack>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer >
    )
}

export default DrawerLeft