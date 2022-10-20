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

    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        dispatch(getUsers(newPage))
    };
    const addUsers = async () =>{
        await  dispatch(postRegister({count}))
        dispatch(getUsers())
    }


    const [contacts, setContacts] = useState([]);

    const [editContactId, setEditContactId] = useState(null);

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        setEditContactId(null);
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

    useEffect(() => {
        dispatch(getUsers())
    }, []);

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
                                    handleCancelClick={handleCancelClick}
                                />
                            ) : (
                                <ReadOnlyRow
                                    contact={contact}
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