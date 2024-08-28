import React from "react";
import { Card, CardContent, CardActions, Typography, Button, CardMedia, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "../types/Users";

const StyledCard = styled(Card)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    maxWidth: "800px",
    width: "100%",
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "8px",
    padding: "10px 20px",
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
        maxWidth: "400px",
        flexDirection: "column",
        textAlign: "center",
        height: "300px",
    },
    [theme.breakpoints.down("xs")]: {
        maxWidth: "300px",
        height: "300px",
    },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    borderRadius: "50%",
    objectFit: "cover",
    height: "160px",
    width: "160px",
    [theme.breakpoints.down("sm")]: {
        height: "100px",
        width: "100px",
        margin: "auto",
    },
}));

const StyledCardDetail = styled(Box)(({ theme }) => ({
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    [theme.breakpoints.down("sm")]: {
        flex: 0.5,
        padding: "4px",
    },
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "16px",
    gap: "8px",
    [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
    },
}));

const EditButtonText = styled("span")(({ theme }) => ({
    display: "inline",
    [theme.breakpoints.down("sm")]: {
        display: "none",
    },
}));

interface UserCardProps {
    user: User;
    onEdit: () => void;
    onDelete: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
    return (
        <StyledCard>
            <StyledCardMedia image={`https://picsum.photos/200?random=${user.id}`} />
            <StyledCardDetail>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {user.name}
                    </Typography>
                    <Typography variant="body2" color="pallete.secondary.main">
                        {user.email}
                    </Typography>
                    <Typography variant="body2" color="pallete.secondary.main">
                        {user.phone}
                    </Typography>
                </CardContent>
            </StyledCardDetail>

            <StyledCardActions>
                <Button
                    size="small"
                    onClick={onEdit}
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                    <EditIcon />
                    <EditButtonText>Edit</EditButtonText>
                </Button>
                <Button size="small" onClick={onDelete} color="error">
                    <DeleteIcon />
                </Button>
            </StyledCardActions>
        </StyledCard>
    );
};

export default UserCard;
