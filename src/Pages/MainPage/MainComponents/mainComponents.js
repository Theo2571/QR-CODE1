import React, {useState, Fragment, useEffect} from "react";
import s from "./mainComponents.module.css";
import ReadOnlyRow from "./mainAdd";
import EditableRow from "./mainTabl";
import {getUsers, postRegister} from "../../../store/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import TablePagination from '@mui/material/TablePagination';

const MainComponents = () => {
    const items = useSelector( store => store.userReducer.users);
    const total = useSelector( store => store.userReducer.total);

    const dispatch = useDispatch()
    const [count , setCount] = useState()
    console.log(items)

    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        dispatch(getUsers(newPage))
    };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(1);
    // };
    const addUsers = async () =>{
      await  dispatch(postRegister({count}))
        dispatch(getUsers())
    }
    useEffect(() => {
        dispatch(getUsers())
    }, []);
    useEffect(() => {
        // console.log(items)
    }, [items])
    const [contacts, setContacts] = useState([]);
    // const [addFormData, setAddFormData] = useState({
    //     hash: "",
    //     qr: "",
    //     name: "",
    //     lastname: "",
    //     birthday: "",
    //     phone: "",
    //     address: "",
    //     MomName: "",
    //     MomPhone: "",
    //     DadName: "",
    //     DadPhone: "",
    // });

    // const [editFormData, setEditFormData] = useState({
    //     hash: "",
    //     qr: "",
    //     name: "",
    //     lastname: "",
    //     birthday: "",
    //     phone: "",
    //     address: "",
    //     MomName: "",
    //     MomPhone: "",
    //     DadName: "",
    //     DadPhone: "",
    // });

    const [editContactId, setEditContactId] = useState(null);

    const handleAddFormChange = (event) => {
        event.preventDefault();

        // const fieldName = event.target.getAttribute("name");
        // const fieldValue = event.target.value;

        // const newFormData = { ...addFormData };
        // newFormData[fieldName] = fieldValue;

        // setAddFormData(newFormData);
    };

    const handleEditFormChange = (event) => {
        // event.preventDefault();
        // //
        // const fieldName = event.target.getAttribute("name");
        // const fieldValue = event.target.value;

        // const newFormData = { ...editFormData };
        // newFormData[fieldName] = fieldValue;

        // setEditFormData(newFormData);
    };

    const  handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newContact = {
            // id: nanoid(items.id),
            // hash: items.hash,
            // qr: items.qr,
            // name: items.name,
            // lastname: items.lastname,
            // birthday: items.birthday,
            // phone: items.phone,
            // address: items.address,
            // MomName: items.MomName,
            // MomPhone: items.MomPhone,
            // DadName: items.DadName,
            // DadPhone:items.DadPhone,
        };

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
    };


    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        // const editedContact = {
        //     id: editContactId,
        //     hash: items.hash,
        //     qr: items.qr,
        //     name: items.name,
        //     lastname: items.lastname,
        //     birthday: items.birthday,
        //     phone: items.phone,
        //     address: items.address,
        //     MomName: items.MomName,
        //     MomPhone: items.MomPhone,
        //     DadName: items.DadName,
        //     DadPhone: items.DadPhone,
        // };

        const newContacts = [...contacts];

        const index = contacts.findIndex((items) => items.id === editContactId);

        // newContacts[index] = editedContact;

        setContacts(newContacts);
        setEditContactId(null);
    };

    const handleEditClick = (event, items) => {
        event.preventDefault();
        setEditContactId(items.id);

        // const formValues = {
        //     hash: contact.items.hash,
        //     qr: contact.items.qr,
        //     name: contact.items.name,
        //     lastname: contact.items.lastname,
        //     birthday: contact.items.birthday,
        //     phone: contact.items.phone,
        //     address: contact.items.address,
        //     MomName: contact.items.MomName,
        //     MomPhone: contact.items.MomPhone,
        //     DadName: contact.items.DadName,
        //     DadPhone: contact.items.DadPhone,
        // };

        // setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditContactId(null);
    };

    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];

        const index = contacts.findIndex((contact) => contact.id === contactId);

        newContacts.splice(index, 1);

        setContacts(newContacts);
    };
    return (
        <div className="app-container">
            <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                    <tr className={s.tr}>
                        <th style={{ fontSize: 15 }}>Хэш</th>
                        <th style={{ fontSize: 15 }} >QR</th>
                        <th style={{ fontSize: 15 }} >Имя</th>
                        <th style={{ fontSize: 15 }} >Фамилия</th>
                        <th style={{ fontSize: 15 }} >Дата Рождения</th>
                        <th style={{ fontSize: 15 }} >Номер телефона</th>
                        <th style={{ fontSize: 15 }} >Место проживания</th>
                        <th style={{ fontSize: 15 }} >ФИО Мамы</th>
                        <th style={{ fontSize: 15 }} >Номер Мамы</th>
                        <th style={{ fontSize: 15 }} >ФИО Папы</th>
                        <th style={{ fontSize: 15 }} >Номер Папы</th>
                        <th style={{ fontSize: 15 }} >Изменить</th>

                    </tr>
                    </thead>
                    <tbody>
                    {items.map((contact) => (
                        <Fragment>
                            {editContactId === items.id ? (
                                <EditableRow
                                    // editFormData={editFormData}
                                    handleEditFormChange={handleEditFormChange}
                                    handleCancelClick={handleCancelClick}
                                />
                            ) : (
                                <ReadOnlyRow
                                    contact={contact}
                                    handleEditClick={handleEditClick}
                                    handleDeleteClick={handleDeleteClick}
                                />
                            )}
                        </Fragment>
                    ))}

                    </tbody>
                </table>
            </form>
            <TablePagination className={s.pagination}
                component="div"
                count={total}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <h2>Добавить пользователя</h2>
            <div>
                <input type="text" placeholder="Добавить пользователей " style={{ width: 170, height: 20}} onChange={(e) => {setCount(e.target.value)}} />
                <button onClick={addUsers}>Add</button>
            </div>


        </div>
    );
};

export default MainComponents;