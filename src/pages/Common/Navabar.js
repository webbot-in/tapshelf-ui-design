import React, { useEffect, useState } from 'react'
import { Avatar, Badge, Button, Divider, InputAdornment, Menu, Stack, TextField, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import DrawerLeft from './DrawerLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { tokenVerify } from './TokenVerify';
import { jwtDecode } from 'jwt-decode';

function Navabar() {
    const navigate = useNavigate()
    const [openDrawer, setOpenDrawer] = useState(false)
    const [anchorElUser, setAnchorElUser] = useState(null);
    const closeDrawer = () => {
        setOpenDrawer(false)
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };




    const logoutHandler = () => {
        navigate('/')
        localStorage.removeItem('token')
    };

    const decodedToken =  localStorage.getItem('token') && jwtDecode(localStorage.getItem("token"));
    const decodedData = {
        Name: localStorage.getItem('token') && decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        Email: localStorage.getItem('token') && decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        Role: localStorage.getItem('token') && decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    }

    useEffect(() => {
        const isValidToken = tokenVerify()
        if (!isValidToken) {
            navigate('/')
        }
    }, [])

    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ ml: { md: '200px', lg: "250px" }, mr: { md: '15px', lg: '25px' } }}>
                <MenuIcon onClick={() => setOpenDrawer(true)} sx={{ display: { md: 'none' } }} />
                <TextField
                    placeholder='Search product, supplier, order'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                    size='small' sx={{ width: { xs: 250, md: 300 } }} />
                <Stack direction={'row'} alignItems={'center'} gap={{ xs: 2, md: 3 }}>
                    <Badge badgeContent={4} color="primary" sx={{ cursor: 'pointer' }}>
                        <NotificationsNoneOutlinedIcon />
                    </Badge>
                    <Avatar src={AccountCircleIcon} onClick={handleOpenUserMenu} sx={{ cursor: 'pointer' }} />
                </Stack>
            </Stack>

            <DrawerLeft openDrawer={openDrawer} closeDrawer={closeDrawer} />

            <Menu
                sx={{ mt: '50px',  }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <Stack sx={{ mt: '4px', minWidth:300 }}>
                    {Object.keys(decodedData).map((items, index) => (
                        <Stack justifyContent={'space-around'} sx={{ height: 40 }} key={index}>
                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                gap={3}
                                sx={{ margin: '0px 20px' }}
                            >
                                <Typography noWrap sx={{ opacity: 0.5, fontFamily: 'Poppins' }}>
                                    {items}
                                </Typography>
                                <Typography noWrap sx={{ fontFamily: 'Poppins' }}>
                                    {decodedData[items]}
                                </Typography>
                            </Stack>
                            <Divider />
                        </Stack>
                    ))}
                    <Stack alignItems={'center'} mt={1} mb={0.5}>
                        <Button
                            onClick={logoutHandler}
                            size='small'
                            variant='contained'
                            sx={{ width: '160px', bgcolor: 'red', ':hover': { bgcolor: 'red' } }}
                        >
                            {' '}
                            <LogoutIcon fontSize='small' sx={{ mr: 0.5 }} /> Logout
                        </Button>
                    </Stack>
                </Stack>
            </Menu>

        </>
    )
}

export default Navabar