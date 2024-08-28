import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Container, Typography } from "@mui/material";
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
import { UserCard, Header } from "../component";

const initialFormData: User = {
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
            lat: "",
            lng: "",
        },
    },
    phone: "",
    website: "",
    company: {
        name: "",
        catchPhrase: "",
        bs: "",
    },
};

const Home: React.FC = () => {
    const [isShown, setIsShown] = useState<boolean>(false);
    const [userFormData, setUserFormData] = useState<User>(initialFormData);
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

    const handleAddUser = () => {
        setUserFormData({ ...userFormData, id: Date.now() });
        try {
            dispatch(addUser(userFormData));
        } catch (error) {
            console.log(error);
        } finally {
            setUserFormData(initialFormData);
        }
    };

    const handleEditUser = () => {
        dispatch(editUser(userFormData));
        setUserFormData(initialFormData);
    };

    const handleDeleteUser = () => {
        deleteUser(userFormData);
        setUserFormData(initialFormData);
    };

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

    return (
        <StyledContainer maxWidth="xl">
            <Header onAddUserClick={handleAddUser} />
            {users.length == 0 ? (
                <></>
            ) : (
                <>
                    {users.map((item, i) => {
                        return (
                            <UserCard
                                onEdit={handleEditUser}
                                onDelete={handleDeleteUser}
                                user={item}
                                key={i}
                            />
                        );
                    })}
                    <UserCard onEdit={handleEditUser} onDelete={handleDeleteUser} user={users[1]} />
                </>
            )}
        </StyledContainer>
    );
};

export default Home;
