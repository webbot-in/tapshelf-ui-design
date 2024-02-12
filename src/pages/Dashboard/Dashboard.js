import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import DrawerLeft from '../Common/DrawerLeft'

function Dashboard() {
    return (
        <>
            <Box elevation={0} sx={{ width: "100%", pt: 2 }}>
                <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} sx={{ ml: "250px", mr: '25px', height: '90vh' }}>
                    <Typography variant='h6'>Dashboard</Typography>
                </Stack>
            </Box>
            <DrawerLeft />
        </>
    )
}

export default Dashboard