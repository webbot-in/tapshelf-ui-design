import React from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';

function PageNotFound() {
    const navigate = useNavigate()
    return (
        <>
            <Stack alignItems={'center'} justifyContent={'center'} sx={{ height: '100vh' }}>
                <Typography sx={{ fontSize: 150, lineHeight: 1 }}>404</Typography>
                <Typography sx={{ fontSize: 50, fontWeight: 'bold' }}>Page Not Found</Typography>
                <Typography sx={{ textAlign: 'center' }}>Try refing search or use the navigation<br />below to return to main page</Typography>
                <Button variant='contained' onClick={() => navigate('/')} startIcon={<KeyboardDoubleArrowRightOutlinedIcon />} sx={{ mt: 2, textTransform: 'capitalize', borderRadius: '50px', bgcolor: '#2C7DF0', ':hover': { bgcolor: '#2C7DF0' } }}>Back to Inventory</Button>
            </Stack>
        </>
    )
}

export default PageNotFound