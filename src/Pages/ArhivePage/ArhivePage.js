import React, {useState, Fragment, useEffect} from "react";
import s from "../MainPage/MainComponents/mainComponents.module.css"
import {getUsers, postRegister} from "../../store/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import TablePagination from '@mui/material/TablePagination';
import Archive from "./Arhive";
import EditableRow from "../MainPage/MainComponents/mainTabl";

const ArchivePage = () => {
    const items = useSelector( store => store.userReducer.users);
    const total = useSelector( store => store.userReducer.total);
    const dispatch = useDispatch()
    const [count , setCount] = useState()

    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        dispatch(getUsers({limit:rowsPerPage, newPage, page, archived:true}))
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));

        setPage(1);

    };

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
        dispatch(getUsers({page, archived: true}))
    }, []);
    useEffect(() => {
        dispatch(getUsers({limit:rowsPerPage, page, archived: true}))
    }, [rowsPerPage]);

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
                        <th style={{ fontSize: 15 }} >Дата добавления</th>
                        <th style={{ fontSize: 15, textAlign:"center" }} >Действие</th>

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
                                <Archive
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
                             onRowsPerPageChange={handleChangeRowsPerPage}

            />

        </div>
    );
};

export default ArchivePage;