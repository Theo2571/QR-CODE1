import React from "react";

const EditableRow = ({
                         editFormData,
                         handleEditFormChange,
                         handleCancelClick,
                     }) => {
    return (
        <tr>
            <td>
                <input
                    type="text"
                    // required="required"
                    placeholder="Enter a name..."
                    name="hash"
                    value={editFormData.hash}
                    // onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input

                    type="text"
                    // required="required"
                    placeholder="Enter an address..."
                    name="qr"
                    value={editFormData.qr}
                    // onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter a phone number..."
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter an email..."
                    name="lastname"
                    value={editFormData.lastName}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter an email..."
                    name="birthday"
                    value={editFormData.birthday}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter an email..."
                    name="phone"
                    value={editFormData.phone}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter an email..."
                    name="address"
                    value={editFormData.address}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter an email..."
                    name="MomName"
                    value={editFormData.mom?.name}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter an email..."
                    name="MomPhone"
                    value={editFormData.mom?.phone}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter an email..."
                    name="DadName"
                    value={editFormData.dad?.name}
                    onChange={handleEditFormChange}
                ></input>
            </td>  <td>
            <input
                type="text"
                required="required"
                placeholder="Enter an email..."
                name="DadPhone"
                value={editFormData.dad?.phone}
                onChange={handleEditFormChange}
            ></input>
        </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>
                    Cancel
                </button>
            </td>
        </tr>
    );
};

export default EditableRow;