import React from "react";
import { Typography, Button, IconButton, Box } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { styled } from "@mui/system";

const HeaderContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    maxWidth: "1200px",
    width: "100%",
    marginBottom: "50px",
    [theme.breakpoints.down("xs")]: {
        marginBottom: "25px",
    },
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    fontWeight: "bold",
    fontSize: "24px",
    color: `${theme.palette.secondary.dark}`,
}));

const AddUserButton = styled(Button)(({ theme }) => ({
    fontSize: "14px",
    width: "200px",
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main,
    boxShadow: "none",
    border: `1px solid ${theme.palette.primary.light}`,
    [theme.breakpoints.down("sm")]: {
        fontSize: "12px",
        display: "none",
    },
}));

const AddUserIconButton = styled(IconButton)(({ theme }) => ({
    display: "none",
    [theme.breakpoints.down("sm")]: {
        display: "block",
        color: theme.palette.primary.main,
    },
}));

interface HeaderProps {
    onAddUserClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddUserClick }) => {
    return (
        <HeaderContainer position="static">
            <HeaderTitle variant="h6">User List</HeaderTitle>
            <AddUserButton
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={onAddUserClick}
            >
                Add User
            </AddUserButton>
            <AddUserIconButton onClick={onAddUserClick}>
                <AddIcon />
            </AddUserIconButton>
        </HeaderContainer>
    );
};

export default Header;
