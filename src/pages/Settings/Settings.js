import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Navabar from '../Common/Navabar'

function Settings() {
    return (
        <>
            <Stack alignItems={'center'}>
                <Box elevation={0} sx={{ width: { xs: '95%', md: '100%' }, pt: 2 }}>
                    <Navabar />
                    <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} sx={{ ml: { md: '200px', lg: "250px" }, mr: { md: '15px', lg: '25px' }, height: '90vh' }}>
                        <Typography variant='h6'>Settings</Typography>
                    </Stack>
                </Box>
            </Stack>
        </>
    )
}

export default Settings