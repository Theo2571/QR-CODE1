import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller, useFormState } from "react-hook-form";
import s from './Login.module.css';
import { loginValidation, passwordValidation } from '../../validation/validation';
import { useNavigate} from "react-router-dom";
import {getProfile, postAdmin} from "../../store/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {ADMIN_ROUTE} from "../../utils/consts";
    const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { handleSubmit, control } = useForm();
    const { errors } = useFormState({
        control
    })

    const onSubmit = async (data) => {
        console.log("data", data);
        navigate(ADMIN_ROUTE)
        await dispatch(postAdmin(data))

    };

    return (
        <div className={s.auth_form}>
            <Typography variant="h4" component="div">
                Войдите
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div" className={s.auth_form__subtitle}>
                Чтобы получить доступ
            </Typography>
            <form className={s.auth_form__form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="email"
                    rules={loginValidation}
                    render={({ field }) => (
                        <TextField
                            label="Логин"
                            onChange={(e) => field.onChange(e)}
                            value={field.value}
                            fullWidth={ true }
                            size="small"
                            margin="normal"
                            className={s.auth_form__input}
                            error={!!errors.email?.message}
                            helperText={ errors?.email?.message}
                        />
                    )}
                />
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
                            className={s.auth_form__input}
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
            </form>
        </div>
    )
}
export default Login;