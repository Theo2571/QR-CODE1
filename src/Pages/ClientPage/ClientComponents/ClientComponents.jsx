import React, { useEffect, useState } from "react";
import { TextField, Accordion, AccordionSummary, AccordionDetails, Typography, Box, Button } from '@mui/material';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import telega from "../../../assets/ClientPhoto/telegram.png";
import whatsup from "../../../assets/ClientPhoto/whatsapp.png";
import { useForm, Controller, useFormState } from "react-hook-form";
import Modall from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { patchUsers } from "../../../store/actions/userActions";
import Modal from "../../../components/Modal/Modal";
import s from "./ClientComponents.module.css";
import { parentsInputForForm } from "../../../utils/consts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const InputPage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [forModal, setForModal] = useState({})
  const [value, setValue] = useState(null);
  const currentUser = useSelector((store) => store.userReducer.currentUser);
  const { handleSubmit, control, reset, getValues } = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      birthday: "",
      phone: "",
      address: "",
      сommentary: "",
      MomName: "",
      MomPhone: "",
      MomTelegram: "",
      MomWhats: "",
      DadName: "",
      DadPhone: "",
      DadWhats: "",
      DadTelegram: "",
    }
  });

  useEffect(() => {
    if (!!currentUser) {
      reset({
        name: currentUser?.name || "",
        lastName: currentUser?.lastName || "",
        birthday: currentUser?.birthday || "",
        phone: currentUser?.phone || "",
        address: currentUser?.address || "",
        сommentary: currentUser?.сommentary || "",
        MomName: currentUser?.mom?.name || "",
        MomPhone: currentUser?.mom?.phone || "",
        MomTelegram: currentUser?.mom?.tg || "",
        MomWhats: currentUser?.mom?.ws || "",
        DadName: currentUser?.dad?.name || "",
        DadPhone: currentUser?.dad?.phone || "",
        DadWhats: currentUser?.dad?.ws || "",
        DadTelegram: currentUser?.dad?.tg || "",
      });
    }
  }, [currentUser]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getUser = () => {
    dispatch(patchUsers());
  };

  const { errors } = useFormState({
    control,
  });

  const onSubmit = (data) => {
    console.log(data)
    data.mom = {
      name: data.MomName,
      phone: data.MomPhone,
      ws: data.MomWhats,
      tg: data.MomTelegram,
    };
    data.dad = {
      name: data.DadName,
      phone: data.DadPhone,
      ws: data.DadWhats,
      tg: data.DadTelegram,
    };
    dispatch(patchUsers({ data, hash: currentUser.hash })).then(() =>
      handleOpen()
    );
    console.log(currentUser);
  };

  return (
    <div className={s.input}>
      <h1>Ребенок</h1>
      <div>
        <form className={s.input__title} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                style={{ margin: "0 0 10px" }}
                label="Имя"
                onChange={(e) => field.onChange(e)}
                value={field.value}
                fullWidth={true}
                size="small"
                margin="normal"
                className="auth_form__input"
                error={errors.name?.message}
                helpertext={errors?.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <TextField
                style={{ margin: "0 0 10px" }}
                label="Фамилия"
                onChange={(e) => field.onChange(e)}
                value={field.value}
                size="small"
                margin="normal"
                className="auth-form__input"
                error={errors.lastName?.message}
                helpertext={errors?.lastName?.message}
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
              renderInput={(params) => (
                <Controller
                  control={control}
                  name="birthday"
                  render={({ field }) => (
                    <TextField
                      style={{ margin: "0 0 10px" }}
                      label="Дата рождения"
                      onChange={(e) => field.onChange(e)}
                      value={field.value}
                      size="small"
                      margin="normal"
                      {...params}
                      className="auth-form__input"
                      error={errors.birthday?.message}
                      helpertext={errors?.birthday?.message}
                    />
                  )}
                />
              )}
            />
          </LocalizationProvider>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <TextField
                style={{ margin: "0 0 10px" }}
                label="Номер телефона"
                onChange={(e) => field.onChange(e)}
                value={field.value}
                fullWidth={true}
                size="small"
                margin="normal"
                className="auth-form__input"
                error={errors.phone?.message}
                helpertext={errors?.phone?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <TextField
                style={{ margin: "0 0 10px" }}
                label="Место проживания"
                onChange={(e) => field.onChange(e)}
                value={field.value}
                fullWidth={true}
                size="small"
                margin="normal"
                className="auth-form__input"
                error={errors.address?.message}
                helpertext={errors?.address?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="сommentary"
            render={({ field }) => (
              <textarea
                style={{ resize: "none", height: 200, fontSize: 16 }}
                placeholder="Комментарий"
                label="Особенности ребёнка"
                onChange={(e) => field.onChange(e)}
                value={field.value}
                className="auth-form__input"
                error={errors.сommentary?.message}
                helpertext={errors?.сommentary?.message}
              />
            )}
          />

          <h1 className={s.h1}>Родители</h1>
          {parentsInputForForm.map((parent, index) => (
            <div
              className={s.ffff}
              key={index}
            >
              <Accordion className={s.family}>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{parent.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={s.flex}>
                    <Controller
                      control={control}
                      name={parent.firstControllerName}
                      render={({ field }) => (
                        <TextField
                          style={{ margin: "0 0 10px" }}
                          label="ФИО"
                          onChange={(e) => field.onChange(e)}
                          value={field.value}
                          fullWidth={true}
                          size="small"
                          margin="normal"
                          className="auth-form__input"
                          error={errors?.[parent.firstControllerName]?.message}
                          helpertext={errors?.[parent.firstControllerName]?.message}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name={parent.secondControllerName}
                      render={({ field }) => (
                        <TextField
                          style={{ margin: 0 }}
                          label="Номер телефона"
                          onChange={(e) => field.onChange(e)}
                          value={field.value}
                          fullWidth={true}
                          size="small"
                          margin="normal"
                          className="auth-form__input"
                          error={errors?.[parent.secondControllerName]?.message}
                          helpertext={errors?.[parent.secondControllerName]?.message}
                        />
                      )}
                    />
                    <div className={s.mather}>
                      <img
                        className={s.img}
                        src={telega}
                        alt="telegram"
                        onClick={() => { setModalActive(true); setForModal(parent.dataForTgModal) }}
                      />
                      <img
                        className={s.img}
                        src={whatsup}
                        alt="whatsapp"
                        onClick={() => { setModalActive(true); setForModal(parent.dataForWhatsAppModal) }}
                      />
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}


          <div className={s.h2}>
            <Button onClick={getUser} type="submit" variant="contained">
              Сохранить
            </Button>
            <Modall
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-description"
                  style={{ margin: "10px 85px" }}
                  sx={{ mt: 2 }}
                >
                  Успешно сохранено
                </Typography>
              </Box>
            </Modall>
          </div>
        </form>
      </div>


      {forModal.hasOwnProperty("controllerName") &&
        (<Modal active={modalActive} setActive={setModalActive}>
          <AccordionDetails>
            <div className={s.flex}>
              <span>{forModal?.controllerName}</span>
              <Controller
                control={control}
                name={forModal.controllerName}
                render={({ field }) => {
                  const value = getValues(forModal.controllerName);
                  return (
                    <TextField
                      style={{ margin: "0 30px" }}
                      label={forModal.inpLabel}
                      onChange={(e) => field.onChange(e)}
                      value={value}
                      fullWidth={true}
                      size="small"
                      margin="normal"
                      className="auth-form__input"
                      error={errors?.[forModal.controllerName]?.message}
                      helpertext={errors?.[forModal.controllerName]?.message}
                    />
                  )
                }}
              />
            </div>
          </AccordionDetails>
        </Modal>)
      }
    </div>
  );
};

export default InputPage;