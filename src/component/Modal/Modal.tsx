import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import { User } from "../../types/Users";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    modalType: "add" | "edit" | "delete" | "";
    data: User;
}

const Modal: React.FC<ModalProps> = () => {
    return <div>Modal</div>;
};

export default Modal;
