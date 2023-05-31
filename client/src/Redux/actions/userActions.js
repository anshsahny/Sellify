import axios from 'axios'
import { setLoading, setError, userLogin, userLogout, updateProfile, resetUpdate } from '../slices/user'

export const login = (email, password) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/users/login`, { email, password }, config)
        dispatch(userLogin(data))
    } catch (error) {
        dispatch(
            setError(
                error.response && error.response.data.message
                ? error.response.data.message 
                : error.message
                ? error.message
                : 'An unexpected error has occured. Please try again later.'
            )
        )
    }
}

export const logout = () => dispatch => {
    dispatch(userLogout())
}

export const register = (name, email, password) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/users/register`, { name, email, password }, config)
        dispatch(userLogin(data))
    } catch (error) {
        dispatch(
            setError(
                error.response && error.response.data.message
                ? error.response.data.message 
                : error.message
                ? error.message
                : 'An unexpected error has occured. Please try again later.'
            )
        )
    }
}

export const update = (id, name, email, password) => async (dispatch, getState) => {
    const {
        user: { userInfo }
    } = getState()

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/users/profile/${id}`, { _id: id, name, email, password }, config)
        dispatch(updateProfile(data))
    } catch (error) {
        dispatch(
            setError(
                error.response && error.response.data.message
                ? error.response.data.message 
                : error.message
                ? error.message
                : 'An unexpected error has occured. Please try again later.'
            )
        )
    }
}

export const reset = () => async (dispatch) => {
    dispatch(resetUpdate())
}