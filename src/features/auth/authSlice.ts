import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: {
        email: string | null;
        uid: string | null;
    } | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ email: string; uid: string }>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer; 