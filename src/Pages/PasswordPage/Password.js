import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, SubmitHandler, Controller, useFormState } from "react-hook-form";
import './Password.css'
import { loginValidation, passwordValidation } from './validation';
import View from "../ViewPage/View";
// import {CLIENT_ROUTE} from "../../utils/consts";
// import {NavLink,  useNavigate} from "react-router-dom";
// import {LOGIN_ROUTE, FORGOT__ROUTE, CLIENT_ROUTE} from "../../../utils/consts";
// import { postRegister} from "../../../store/slices/userSlice";
// import {useDispatch} from "react-redux";
// import {ISignInForm} from "../../../store/models";

 const Password = () => {
    // const navigate = useNavigate();
    // const dispatch = useDispatch()
    const { handleSubmit, control } = useForm();
    const { errors } = useFormState({
        control
    })
    // const onSubmit: SubmitHandler = async data => {
    //     console.log("data", data);
    //     await dispatch(postRegister(data))
    //     navigate(CLIENT_ROUTE)
    // };

    return (
        <div className="auth-form">
            <Typography variant="h4" component="div">
                Войдите
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div" className="auth-form__subtitle">
                Чтобы получить доступ
            </Typography>
            <form className="auth-form__form" onSubmit={handleSubmit()}>
                <Controller
                    control={control}
                    name="email"
                    rules={loginValidation}
                    render={({ field }) => (
                        <TextField
                            label="Почта"
                            onChange={(e) => field.onChange(e)}
                            value={field.value}
                            fullWidth={ true }
                            size="small"
                            margin="normal"
                            className="auth-form__input"
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
                            className="auth-form__input"
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
                    Регистрация
                </Button>
            </form>

            <div className="auth-form__footer">
                    <Typography  sx={{ color: 'blue'}}>Forgot password</Typography>
            </div>
        </div>
    )
}
export default Password;