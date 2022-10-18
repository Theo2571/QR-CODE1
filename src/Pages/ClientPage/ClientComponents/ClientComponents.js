import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import telega from "../../../assets/ClientPhoto/telegram.png";
import whatsup from "../../../assets/ClientPhoto/whatsapp.png";
import s from "./ClientComponents.module.css";
import { useForm, SubmitHandler, Controller, useFormState } from "react-hook-form";
import {
    DataValidation,
    FirstValidation,
    gpsValidation,
    nameValidation,
    phoneValidation
} from "../../../validation/validation";
import Box from '@mui/material/Box';
import Modall from '@mui/material/Modal';
import Button from "@mui/material/Button";
import { patchUsers} from "../../../store/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../../../Modal/Modal";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const InputPage= () => {
    const [hasMom, setHasMom] = useState(true)
    const [hasDad, setHasDad] = useState(true)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [modalActiveeee, setModalActiveeee] = useState(false)
    const [modalActiveee, setModalActiveee] = useState(false)
    const [modalActivee, setModalActivee] = useState(false)
    const [modalActive, setModalActive] = useState(false)
    const dispatch = useDispatch()
    const currentUser = useSelector( store => store.userReducer.currentUser);


    const getUser = () =>{
        dispatch(patchUsers())
    }

    const { handleSubmit, control } = useForm();
    const { errors } = useFormState({
        control
    })
    const [value, setValue] = useState(null);

    const onSubmit: SubmitHandler = data => {
        data.mom = {
            name: data.MomName,
            phone: data.MomPhone,
            ws: data.MomWhats,
            tg: data.MomTelegram
        };
        data.dad = {
            name: data.DadName,
            phone: data.DadPhone,
            ws: data.DadWhats,
            tg: data.DadTelegram
        };
        dispatch(patchUsers({ data, hash:currentUser.hash })).then(()=> handleOpen());
        console.log(currentUser)

    }

    return (
        <div className={s.input}>
            <h1>Ребенок:</h1>
            <div >
                <form className={s.input__title} onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name="name"
                        rules={nameValidation}
                        render={({ field }) => (
                            <TextField

                                label="Имя"
                                onChange={(e) => field.onChange(e)}
                                value={field.value}
                                fullWidth={ true }
                                size="small"
                                margin="normal"
                                className="auth-form__input"
                                error={!!errors.name?.message}
                                helperText={ errors?.name?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="lastName"
                        rules={FirstValidation}
                        render={({ field }) => (
                            <TextField
                                label="Фамилия"
                                onChange={(e) => field.onChange(e)}
                                value={field.value}
                                size="small"
                                margin="normal"
                                className="auth-form__input"
                                error={!!errors.lastName?.message}
                                helperText={ errors?.lastName?.message}
                            />
                        )}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Дата рождения"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) =>
                                <Controller
                                    control={control}
                                    name="birthday"
                                    rules={DataValidation}
                                    render={({ field }) => (
                                        <TextField
                                            label="Дата рождения"
                                            onChange={(e) => field.onChange(e)}
                                            value={field.value}
                                            size="small"
                                            margin="normal"
                                            {...params}
                                            error={!!errors.birthday?.message}
                                            helperText={ errors?.birthday?.message}
                                        />
                                    )}
                                />
                            }
                        />
                    </LocalizationProvider>
                    <Controller
                        control={control}
                        name="phone"
                        rules={phoneValidation}
                        render={({ field }) => (
                            <TextField
                                label="Номер телефона"
                                onChange={(e) => field.onChange(e)}
                                value={field.value}
                                fullWidth={ true }
                                size="small"
                                margin="normal"
                                className="auth-form__input"
                                error={!!errors.phone?.message}
                                helperText={ errors?.phone?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="address"
                        rules={gpsValidation}
                        render={({ field }) => (
                            <TextField
                                label="Место проживания"
                                onChange={(e) => field.onChange(e)}
                                value={field.value}
                                fullWidth={ true }
                                size="small"
                                margin="normal"
                                className="auth-form__input"
                                error={!!errors.address?.message}
                                helperText={ errors?.address?.message}
                            />
                        )}
                    />
                    <h1 className={s.h1}>Родители:</h1>

                    {hasMom &&
                        <Accordion className={s.family}>
                            <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Мама</Typography>
                            </AccordionSummary>
                            <AccordionDetails  >
                                <div className={s.flex}>
                                    <Controller
                                        control={control}
                                        name="MomName"
                                        render={({ field }) => (
                                            <TextField

                                                label="ФИО"
                                                onChange={(e) => field.onChange(e)}
                                                value={field.value}
                                                fullWidth={ true }
                                                size="small"
                                                margin="normal"
                                                className="auth-form__input"
                                                error={!!errors.MomName?.message}
                                                helperText={ errors?.MomName?.message}
                                            />
                                        )}
                                    />

                                    <Controller
                                        control={control}
                                        name="MomPhone"
                                        render={({ field }) => (
                                            <TextField
                                                label="Номер телефона"
                                                onChange={(e) => field.onChange(e)}
                                                value={field.value}
                                                fullWidth={ true }
                                                size="small"
                                                margin="normal"
                                                className="auth-form__input"
                                                error={!!errors.MomPhone?.message}
                                                helperText={ errors?.MomPhone?.message}
                                            />
                                        )}
                                    />
                                    <div className={s.mather}>
                                        <img className={s.img} src={telega} alt="" onClick={() => setModalActive(true)}/>
                                        <img className={s.img} src={whatsup} alt="" onClick={() => setModalActivee(true)}/>
                                    </div>

                                    <button onClick={()=> setHasMom(false)}>Удалить</button>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    }

                    {hasDad  &&
                        <Accordion className={s.family}>
                            <AccordionSummary
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Папа</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={s.flex}>
                                    <Controller
                                        control={control}
                                        name="DadName"
                                        render={({ field }) => (
                                            <TextField
                                                label="ФИО"
                                                onChange={(e) => field.onChange(e)}
                                                value={field.value}
                                                fullWidth={ true }
                                                size="small"
                                                margin="normal"
                                                className="auth-form__input"
                                                error={!!errors.DadName?.message}
                                                helperText={ errors?.DadName?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name="DadPhone"
                                        render={({ field }) => (
                                            <TextField
                                                label="Номер телефона"
                                                onChange={(e) => field.onChange(e)}
                                                value={field.value}
                                                fullWidth={ true }
                                                size="small"
                                                margin="normal"
                                                className="auth-form__input"
                                                error={!!errors.DadPhone?.message}
                                                helperText={ errors?.DadPhone?.message}
                                            />
                                        )}
                                    />
                                    <div className={s.mather}>
                                        <img className={s.img} src={telega} alt="" onClick={() => setModalActiveee(true)}/>
                                        <img className={s.img} src={whatsup} alt="" onClick={() => setModalActiveeee(true)}/>
                                    </div>
                                    <button onClick={()=> setHasDad(false)}>Удалить</button>

                                </div>
                            </AccordionDetails>
                        </Accordion>
                    }

                    <div className={s.h2}>
                        <Button
                            onClick={getUser}

                            type="submit"
                            variant="contained" >
                            Сохранить</Button>
                        <Modall
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-description" style={{margin: "10px 85px"}} sx={{ mt: 2 }}>
                                    Успешно сохранено
                                </Typography>
                            </Box>
                        </Modall>
                    </div>
                </form>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <AccordionDetails>
                    <div className={s.flex}>
                        <Controller
                            control={control}
                            name="MomTelegram"
                            render={({ field }) => (
                                <TextField
                                    label="Ссылка на Телеграмм"
                                    onChange={(e) => field.onChange(e)}
                                    value={field.value}
                                    fullWidth={ true }
                                    size="small"
                                    margin="normal"
                                    className="auth-form__input"
                                    error={!!errors.MomTelegram?.message}
                                    helperText={ errors?.MomTelegram?.message}
                                />
                            )}
                        />
                    </div>
                </AccordionDetails>
            </Modal>
            <Modal active={modalActivee} setActive={setModalActivee}>
                <AccordionDetails>
                    <div className={s.flex}>
                        <Controller
                            control={control}
                            name="MomWhats"
                            render={({ field }) => (
                                <TextField
                                    label="Ссылка на Вотсап"
                                    onChange={(e) => field.onChange(e)}
                                    value={field.value}
                                    fullWidth={ true }
                                    size="small"
                                    margin="normal"
                                    className="auth-form__input"
                                    error={!!errors.MomWhats?.message}
                                    helperText={ errors?.MomWhats?.message}
                                />
                            )}
                        />
                    </div>
                </AccordionDetails>
            </Modal>
            <Modal active={modalActiveee} setActive={setModalActiveee}>
                <AccordionDetails>
                    <div className={s.flex}>
                        <Controller
                            control={control}
                            name="DadTelegram"
                            render={({ field }) => (
                                <TextField
                                    label="Ссылка на Телеграмм"
                                    onChange={(e) => field.onChange(e)}
                                    value={field.value}
                                    fullWidth={ true }
                                    size="small"
                                    margin="normal"
                                    className="auth-form__input"
                                    error={!!errors.DadTelegram?.message}
                                    helperText={ errors?.DadTelegram?.message}
                                />
                            )}
                        />
                    </div>
                </AccordionDetails>
            </Modal>
            <Modal active={modalActiveeee} setActive={setModalActiveeee}>
                <AccordionDetails>
                    <div className={s.flex}>
                        <Controller
                            control={control}
                            name="DadWhats"
                            render={({ field }) => (
                                <TextField
                                    label="Ссылка на Вотсап"
                                    onChange={(e) => field.onChange(e)}
                                    value={field.value}
                                    fullWidth={ true }
                                    size="small"
                                    margin="normal"
                                    className="auth-form__input"
                                    error={!!errors.DadWhats?.message}
                                    helperText={ errors?.DadWhats?.message}
                                />
                            )}
                        />
                    </div>
                </AccordionDetails>
            </Modal>
        </div>
    );
};

export default InputPage;