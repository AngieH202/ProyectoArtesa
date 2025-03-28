import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string,
    nombre: string,
    correo: string,
    contraseña: string,
    created_at: string,
}

const initialState: User[] = [];

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {return action.payload},
    },
});

export const {setUsers} = usersSlice.actions;
export default usersSlice.reducer;