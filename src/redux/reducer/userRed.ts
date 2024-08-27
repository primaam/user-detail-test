import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {User} from '../../types/Users'

interface UserState{
    users: User[];
    loading: boolean;
    error: string | null
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        getUsersStart(state){
            state.loading = true;
            state.error = null
        },
        getUsersSuccess(state, action: PayloadAction<User[]>){
            state.users = action.payload
            state.loading = false;
        },
        getUsersFailed(state, action: PayloadAction<string>){
            state.loading = false
            state.error = action.payload
        },
        addUser(state, action: PayloadAction<User>){
            state.users.push(action.payload)
        },
        editUser(state, action: PayloadAction<User>){
            const id = state.users.findIndex((item)=> {return item.id === action.payload.id})
            if(id !== undefined){
                state.users[id] = action.payload
            }
        },
        deleteUser(state, action: PayloadAction<User>){
            state.users = state.users.filter((item) =>{return item.id !== action.payload.id })
        }
    }
})

export const{
    addUser,
    deleteUser,
    editUser,
    getUsersFailed,
    getUsersStart,
    getUsersSuccess
} = userSlice.actions

export default userSlice.reducer