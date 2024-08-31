// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { AppBar, Box, Button, Toolbar, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    const { user, logout } = useContext(AuthContext);
    let navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='primary'>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link href="/" color="inherit" underline="none">
                            Blogging App
                        </Link>
                    </Typography>
                    {!user ? (
                        <>
                            <Button color="inherit" href='/login'>Login</Button>
                            <Button color="inherit" href='/register'>Register</Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" href='/activitylog'>Activity Log</Button>
                            <Button color="inherit" onClick={onLogout}>Logout</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
