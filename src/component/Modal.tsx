import React, { useMemo } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import { User } from "../types/Users";

const StyledTextField = styled(TextField)({
    margin: "16px 0",
});

interface ModalProps {
    show: boolean;
    onClose: () => void;
    modalType: "add" | "edit" | "delete" | "";
    data: User;
    onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onConfirm: () => void;
    errorMsg: boolean;
}

const Modal: React.FC<ModalProps> = ({
    show,
    onClose,
    modalType,
    data,
    onFormChange,
    onConfirm,
    errorMsg,
}) => {
    const isDelete = modalType === "delete";
    const isEditOrAdd = modalType === "edit" || modalType === "add";

    const title = useMemo(() => {
        switch (modalType) {
            case "add":
                return "Add User";
            case "edit":
                return "Edit User";
            case "delete":
                return "Delete User";
            default:
                return "";
        }
    }, [modalType]);

    return (
        <Dialog open={show} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {isEditOrAdd && (
                    <>
                        <StyledTextField
                            label="Name"
                            name="name"
                            value={data.name}
                            onChange={onFormChange}
                            fullWidth
                            required
                            error={errorMsg}
                        />
                        <StyledTextField
                            label="Username"
                            name="username"
                            value={data.username}
                            onChange={onFormChange}
                            fullWidth
                            required
                            error={errorMsg}
                        />
                        <StyledTextField
                            label="Email"
                            name="email"
                            value={data.email}
                            onChange={onFormChange}
                            fullWidth
                            required
                            error={errorMsg}
                        />
                        <StyledTextField
                            label="Phone"
                            name="phone"
                            value={data.phone}
                            onChange={onFormChange}
                            fullWidth
                            required
                            error={errorMsg}
                        />
                        <StyledTextField
                            label="Street"
                            name="address.street"
                            value={data.address.street}
                            onChange={onFormChange}
                            fullWidth
                        />
                        <StyledTextField
                            label="Suite"
                            name="address.suite"
                            value={data.address.suite}
                            onChange={onFormChange}
                            fullWidth
                        />
                        <StyledTextField
                            label="City"
                            name="address.city"
                            value={data.address.city}
                            onChange={onFormChange}
                            fullWidth
                        />
                        <StyledTextField
                            label="Latitude"
                            name="address.geo.lat"
                            value={data.address.geo.lat}
                            onChange={onFormChange}
                            fullWidth
                        />
                        <StyledTextField
                            label="Longitude"
                            name="address.geo.lng"
                            value={data.address.geo.lng}
                            onChange={onFormChange}
                            fullWidth
                        />
                        <StyledTextField
                            label="Zipcode"
                            name="address.zipcode"
                            value={data.address.zipcode}
                            onChange={onFormChange}
                            fullWidth
                        />

                        <StyledTextField
                            label="Website"
                            name="website"
                            value={data.website}
                            onChange={onFormChange}
                            fullWidth
                        />
                        <StyledTextField
                            label="Company Name"
                            name="company.name"
                            value={data.company.name}
                            onChange={onFormChange}
                            fullWidth
                        />
                    </>
                )}
                {isDelete && (
                    <DialogContentText>
                        Are you sure you want to delete this user?
                    </DialogContentText>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="primary">
                    {isDelete ? "Confirm" : "Submit"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
