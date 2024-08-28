import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

import { RootState, AppDispatch } from "../redux/store";
import {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    addUser,
    deleteUser,
    editUser,
} from "../redux/reducer/userRed";
import { User } from "../types/Users";
import { UserCard, Header, Modal } from "../component";
import { initialFormData } from "../helper/dataHelper";

const StyledContainer = styled(Container)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledBox = styled(Box)(({ theme }) => ({
    width: "1200px",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "200px",
    [theme.breakpoints.down("lg")]: {},
}));

const Home: React.FC = () => {
    const [isShown, setIsShown] = useState<boolean>(false);
    const [modalType, setModalType] = useState<"add" | "delete" | "edit" | "">("");
    const [userFormData, setUserFormData] = useState<User>(initialFormData);
    const [formError, setFormError] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    const { users, error, loading } = useSelector((state: RootState) => ({
        users: state.user.users,
        loading: state.user.loading,
        error: state.user.error,
    }));

    useEffect(() => {
        const getUsers = async () => {
            dispatch(getUsersStart());
            try {
                const response = await axios<User[]>({
                    method: "GET",
                    url: "https://jsonplaceholder.typicode.com/users",
                });
                dispatch(getUsersSuccess(response.data));
            } catch (error) {
                dispatch(getUsersFailed("Failed"));
            }
        };
        getUsers();
    }, [dispatch]);

    const handleShowModal = (type: "add" | "delete" | "edit", id?: number) => {
        setModalType(type);
        setFormError(false);

        if (type === "edit" || type === "delete") {
            const user = users.find((item) => {
                return item.id === id;
            });
            if (user !== undefined) {
                setUserFormData(user);
                setIsShown(true);
            }
        } else {
            setIsShown(true);
        }
    };

    const handleCloseModal = () => {
        setIsShown(false);
        setUserFormData(initialFormData);
        setModalType("");
        setFormError(false);
    };

    const handleSubmitForm = () => {
        const emptyFields =
            userFormData.name.length === 0 ||
            userFormData.email.length === 0 ||
            userFormData.username.length === 0 ||
            userFormData.phone.length === 0;

        if (emptyFields && modalType === "add") {
            setFormError(true);
            return;
        } else {
            setFormError(false);
        }
        switch (modalType) {
            case "add":
                setUserFormData({ ...userFormData, id: Date.now() });
                dispatch(addUser(userFormData));
                break;
            case "delete":
                dispatch(deleteUser(userFormData));
                break;
            case "edit":
                dispatch(editUser(userFormData));
                break;
            default:
                break;
        }

        handleCloseModal();
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const keys = name.split(".");

        setUserFormData((prevData) => {
            let newData = { ...prevData };
            let current: any = newData;

            for (let i = 0; i < keys.length; i++) {
                if (i === keys.length - 1) {
                    current[keys[i]] = value;
                } else {
                    current[keys[i]] = { ...current[keys[i]] };
                    current = current[keys[i]];
                }
            }

            return newData;
        });
    };

    return (
        <StyledContainer maxWidth="xl">
            <Header onAddUserClick={() => handleShowModal("add")} />
            {users.length == 0 ? (
                <></>
            ) : (
                <>
                    {users.map((item, i) => {
                        return (
                            <UserCard
                                onEdit={() => handleShowModal("edit", item.id)}
                                onDelete={() => handleShowModal("delete", item.id)}
                                user={item}
                                key={i}
                            />
                        );
                    })}
                </>
            )}

            <Modal
                data={userFormData}
                show={isShown}
                modalType={modalType}
                onFormChange={handleFormChange}
                onConfirm={handleSubmitForm}
                onClose={handleCloseModal}
                errorMsg={formError}
            />
        </StyledContainer>
    );
};

export default Home;
