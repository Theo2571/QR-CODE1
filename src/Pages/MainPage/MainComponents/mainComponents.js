import React, {useState, Fragment, useEffect} from "react";
import s from "./mainComponents.module.css";
import ReadOnlyRow from "./mainAdd";
import EditableRow from "./mainTabl";
import {getUsers, postRegister} from "../../../store/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import TablePagination from '@mui/material/TablePagination';


const MainComponents = () => {
    const d = new Date()
    const items = useSelector( store => store.userReducer.users);
    const total = useSelector( store => store.userReducer.total);
    const dispatch = useDispatch()
    const [contacts, setContacts] = useState([]);
    const [count , setCount] = useState()
    const [date ,setDate] = useState({from: d.setMonth(d.getMonth() - 1), to: new Date()})
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [editContactId, setEditContactId] = useState(null);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        dispatch(getUsers({limit:rowsPerPage, page, archived: false}))
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);

    };

    const addUsers = async () =>{
        await  dispatch(postRegister({count}))
        dispatch(getUsers({limit:rowsPerPage, page, archived: false}))
    }

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
    const print = () => {
        window.print();
    }
    useEffect(() => {
        dispatch(getUsers({limit:rowsPerPage,page,archived: false}))
    }, [page]);

    useEffect(() => {
        dispatch(getUsers({limit:rowsPerPage, page, archived: false}))
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
                        <th style={{ fontSize: 15 }} >Архивировать</th>

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
                             onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {/*<div className={s.add}>*/}
            {/*<h2>Добавить пользователя</h2>*/}
            {/*<div>*/}
            {/*    <input type="text" placeholder="Добавить пользователей " style={{ width: 170, height: 20}} onChange={(e) => {setCount(e.target.value)}} />*/}
            {/*    <button onClick={addUsers}>Add</button>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <div className={s.print}>*/}
            {/*<DateFilter  date={date} setDate={({ from, to }) => {*/}
            {/*    setDate({ from, to });*/}
            {/*    dispatch( ( getUsers({ limit:rowsPerPage, createDateStart: from, createDateEnd: to }) ) );*/}
            {/*}}/>*/}
            {/*    </div>*/}
            {/*    <button className={s.print} onClick={print}>Печатать QR-Code</button>*/}
            {/*    <div className={s.active__print} >*/}
            {/*    {items.map((item) => (*/}
            {/*        <>*/}
            {/*        <div>*/}
            {/*            <div>*/}
            {/*            <Qr hash={item.hash}/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        </>*/}
            {/*        ))}*/}
            {/*    </div>*/}

            {/*</div>*/}
        </div>
    );
};

export default MainComponents;