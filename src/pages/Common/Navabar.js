import React, { useState } from 'react'
import { Avatar, InputAdornment, Stack, TextField } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import DrawerLeft from './DrawerLeft';
import LadyProfile from './images/ladyprofile.jpg'

function Navabar() {
    const [openDrawer, setOpenDrawer] = useState(false)
    console.log(openDrawer)
    const closeDrawer = () => {
        setOpenDrawer(false)
        console.log('call drawer fn')
    }
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
                    <NotificationsNoneOutlinedIcon />
                    <Avatar src={LadyProfile} />
                </Stack>
            </Stack>

            <DrawerLeft openDrawer={openDrawer} closeDrawer={closeDrawer} />

        </>
    )
}

export default Navabar