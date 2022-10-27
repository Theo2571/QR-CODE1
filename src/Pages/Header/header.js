import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, ARHIVE_ROUTE} from "../../utils/consts";



const ResponsiveAppBar = () => {


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ADMIN
                    </Typography>



                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <NavLink style={{textDecoration:"none"}} to={ADMIN_ROUTE}>
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Пользователи
                            </Button>
                        </NavLink>

                        <NavLink style={{textDecoration:"none"}} to={ARHIVE_ROUTE}>
                        <Button
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Архивация
                        </Button>
                    </NavLink>
                    </Box>


                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;