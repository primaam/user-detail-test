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
        fetchUserStart(state){
            state.loading = true;
            state.error = null
        }
    }
})