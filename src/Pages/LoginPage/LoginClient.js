import React, {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller, useFormState } from "react-hook-form";
import ss from'./Login.module.css';
import {passwordValidation } from '../../validation/validation';
import { NavLink, useNavigate, useParams} from "react-router-dom";
import {getProfile, getUserss, postLogin} from "../../store/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import View from "../ViewPage/View";
const Login = () => {
    const [currantUser, setCurrantUser] = useState(null)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {hash} = useParams()
    const {error} = useSelector( store => store.userReducer);
    const { handleSubmit, control,setError, reset } = useForm();
    const { errors } = useFormState({
        control
    })

    useEffect(() => {
        reset({hash})
    }, []);


    const onSubmit = async (data) => {
        console.log("data", data);
        await dispatch(postLogin(data))
        dispatch(getProfile())

        if(localStorage.getItem('token')){
            navigate(`/client/${hash}`)
        } else {
            setError('password', {  message: error });
        }
    };
    useEffect(() => {
        dispatch(getUserss(hash)).then((res)=> {
            setCurrantUser(res.payload.verified)
        })


    }, []);

    return (
        <>
            {currantUser ?

                <View/>
        // <div className={ss.auth_form}>
        //     <Typography variant="h4" component="div">
        //         Войдите
        //     </Typography>
        //     <Typography variant="subtitle1" gutterBottom component="div" className={ss.auth_form__subtitle}>
        //         Чтобы получить доступ
        //     </Typography>
        //     <form className={ss.auth_form__form} onSubmit={handleSubmit(onSubmit)}>
        //
        //         <Controller
        //             control={control}
        //             name="password"
        //             rules={passwordValidation}
        //             render={({ field }) => (
        //                     <TextField
        //                         label="Пароль"
        //                         onChange={(e) => field.onChange(e)}
        //                         value={field.value}
        //                         fullWidth={ true }
        //                         size="small"
        //                         margin="normal"
        //                         type="password"
        //                         className={ss.auth_form__input}
        //                         error={ !!errors?.password?.message }
        //                         helperText={ errors?.password?.message }
        //                     />
        //
        //             )}
        //         />
        //         <Button
        //             type="submit"
        //             variant="contained"
        //             fullWidth={ true }
        //             disableElevation={ true }
        //             sx={{
        //                 marginTop: 2
        //             }}
        //         >
        //             Войти
        //         </Button>
        //         <div className="auth-form__footer">
        //
        //             <Typography variant="subtitle1" component="span" sx={{ color: 'blue'}}>
        //                 <NavLink style={{ fontSize: 15 }} to={`/view/${hash}`}> Посмотреть анкету</NavLink>
        //
        //             </Typography>
        //         </div>
        //     </form>
        // </div>
                :
                        <div className={ss.auth_form}>
                            <Typography variant="h4" component="div">
                                Создайте
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom component="div" className={ss.auth_form__subtitle}>
                               Пароль чтобы получить доступ
                            </Typography>
                            <form className={ss.auth_form__form} onSubmit={handleSubmit(onSubmit)}>

                                <Controller
                                    control={control}
                                    name="password"
                                    rules={passwordValidation}
                                    render={({ field }) => (
                                        <TextField
                                            label="Пароль"
                                            onChange={(e) => field.onChange(e)}
                                            value={field.value}
                                            fullWidth={ true }
                                            size="small"
                                            margin="normal"
                                            type="password"
                                            className={ss.auth_form__input}
                                            error={ !!errors?.password?.message }
                                            helperText={ errors?.password?.message }
                                        />

                                    )}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth={ true }
                                    disableElevation={ true }
                                    sx={{
                                        marginTop: 2
                                    }}
                                >
                                    Войти
                                </Button>
                                <div className="auth-form__footer">

                                    {/*<Typography variant="subtitle1" component="span" sx={{ color: 'blue'}}>*/}
                                        {/*<NavLink style={{ fontSize: 15 }} to={`/view/${hash}`}> Посмотреть анкету</NavLink>*/}

                                    {/*</Typography>*/}
                                </div>
                            </form>
                        </div>
            }
        </>
    )
}
export default Login;