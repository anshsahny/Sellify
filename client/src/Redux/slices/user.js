import { createSlice } from "@reduxjs/toolkit";

const updateLocalStorage = (info) => {
    localStorage.setItem('userInfo', JSON.stringify(info))
}

export const initialState = {
    loading: false,
    error: null,
    userInfo : JSON.parse(localStorage.getItem('userInfo')) ?? null,
    updateSuccess: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        userLogin: (state, { payload }) => {
            state.userInfo = payload;
            state.error = null;
            state.loading = false
            updateLocalStorage(state.userInfo)
        },
        setError: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        },
        userLogout: (state) => {
            state.userInfo = null;
            state.error = null;
            state.loading = false
            localStorage.removeItem('userInfo')
        },
        updateProfile: (state, { payload }) => {
            state.userInfo = payload;
            state.error = null;
            state.loading = false
            state.updateSuccess = true;
            updateLocalStorage(state.userInfo)
        },
        resetUpdate: (state) => {
            state.updateSuccess = false;
        }
    }
})

export const { setLoading, userLogin, setError, userLogout, updateProfile, resetUpdate } = userSlice.actions
export default userSlice.reducer

export const userSelector = (state) => state.userInfo