// eslint-disable-next-line no-unused-vars
import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='primary'>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Blogging App
                    </Typography>
                    <Button color="inherit" href='/login'>Login</Button>
                    <Button color="inherit" href='/register'>Register</Button>
                </Toolbar>
            </AppBar>
        </Box >
    );

}
