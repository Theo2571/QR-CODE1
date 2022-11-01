import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import s from "../MainPage/MainComponents/mainComponents.module.css";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, ARHIVE_ROUTE, PRINT_ROUTE} from "../../utils/consts";
import {useState} from "react";
import Modal from "../../Modal/Modal";
import {getUsers, postRegister} from "../../store/slices/userSlice";
import {useDispatch} from "react-redux";

const ResponsiveAppBar = () => {
    const [modalActive, setModalActive] = useState(false)
    const dispatch = useDispatch()
    const [count , setCount] = useState()
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const addUsers = async () =>{
        await  dispatch(postRegister({count}))
        dispatch(getUsers({limit:rowsPerPage, page, archived: false}))
        setModalActive(false)
    }
    return (
        <div className={s.bar} >
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
                        ONLINE-CARD
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
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
                        <NavLink style={{textDecoration:"none"}} to={PRINT_ROUTE}>
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Распечатать
                            </Button>
                        </NavLink>
                    </Box>

                    <div>
                    <div>
                        <p style={{cursor:"pointer"}} onClick={() => setModalActive(true)}>Добавить Пользователей</p>
                    </div>
                    <Modal active={modalActive} setActive={setModalActive}>
                        <div style={{display:"flex", justifyContent:"center", gap:20}}>
                            <input type="text" placeholder="Добавить пользователей " style={{ width: 170, height: 20, padding:10}} onChange={(e) => {setCount(e.target.value)}} />
                            <div style={{display:"flex", alignItems:"center"}}>
                            <button style={{padding:5, cursor:"pointer"}} onClick={addUsers} >Добавить</button>
                            </div>
                        </div>
                    </Modal>
                    </div>

                </Toolbar>
            </Container>
        </AppBar>
        </div>
    );
};
export default ResponsiveAppBar;