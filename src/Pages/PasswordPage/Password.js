import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller, useFormState } from "react-hook-form";
import './Password.css'
import { loginValidation, passwordValidation } from './validation';


 const Password = () => {
    const { handleSubmit, control } = useForm();
    const { errors } = useFormState({
        control
    })
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