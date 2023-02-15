import React, { useState, Fragment, useEffect } from "react";
import s from "../MainPage/MainComponents/mainComponents.module.css";
import { useDispatch, useSelector } from "react-redux";
import TablePagination from "@mui/material/TablePagination";
import Archive from "./Arhive";
import EditableRow from "../MainPage/MainComponents/mainTabl";
import { getUsers } from "../../store/actions/userActions";
import { tableHeadTexts } from "../../utils/consts";

const ArchivePage = () => {
  const { users, total } = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editContactId, setEditContactId] = useState(null);

  useEffect(() => {
    dispatch(getUsers({ page, archived: true }));
  }, []);

  useEffect(() => {
    dispatch(getUsers({ limit: rowsPerPage, page, archived: true }));
  }, [rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getUsers({ limit: rowsPerPage, newPage, page, archived: true }));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

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

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr className={s.tr}>
              {tableHeadTexts.map((text, index) => (
                <th key={index} style={{ fontSize: 15 }}>{text}</th>
              ))}
              <th style={{ fontSize: 15, textAlign: "center" }}>Действие</th>
            </tr>
          </thead>
          <tbody>
            {users.map((contact) => (
              <Fragment>
                {editContactId === users.id ? (
                  <EditableRow handleCancelClick={handleCancelClick} />
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
      <TablePagination
        className={s.pagination}
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
