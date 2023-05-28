import { Config } from "@/Config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

type GoogleUserRespone = {
    email: string
    name: string
    picture: string
    family_name?: string
    given_name?: string
    hd?: string
    id?: string
    locale?: string
    phone: string,
    verified_email: boolean
}

type FacebookPicture = {
    data: { height: number, is_silhouette: boolean, url: string, width: number }
}

type FacebookUserRespone = {
    email: string
    id: string
    name: string
    picture: FacebookPicture
    phone?: string
}

type UserRespone = {
    email: string
    id: string
    username: string
    name: string
    age?: number
    phone?: string
}

type FetchError = {
    message: any
}
const initialState = {
    id: "",
    email: "",
    name: "",
    username: "",
    picture: "",
    phone: "",
    loading: false,
    error: ""
}
export const getGoogleUser = createAsyncThunk<
    GoogleUserRespone,
    string,
    { rejectValue: FetchError }
>(
    "login/google",
    async (token: string, thunkapi) => {
        try {
            const res = await fetch("https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + token);
            const user = res.json();
            return user
        }
        catch (error) {
            console.log(error)
        }
    })


export const getFacebookUser = createAsyncThunk<
    FacebookUserRespone,
    string,
    { rejectValue: FetchError }
>(
    "login/facebook",
    async (token: string, thunkapi) => {
        try {
            const res = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`);
            const user = res.json();
            return user
        }
        catch (error) {
            console.log(error)
        }
    })

export const updateUserInfo = createAsyncThunk<
    any,
    any,
    { rejectValue: FetchError }
>(
    "users/update",
    async (params: { token: string, id: number, info: Object }, { rejectWithValue }) => {
        console.log(params)
        try {
            const response = await axios({
                headers: {
                    Authorization: `Bearer ${params.token}`,
                },
                method: "PUT",
                url: `${Config.API_URL}users/${params.id}`,
                data: params.info
            })

            return response.data.data
        }
        catch (error) {
            console.log(error)
            return {
                message: "error"
            }
        }
    })


export const getUserDB = createAsyncThunk<
    UserRespone,
    any,
    { rejectValue: FetchError }
>(
    "login/db",
    async (params: { token: string, username: string }, { rejectWithValue }) => {
        try {
            console.log(params)
            const config = {
                headers: {
                    Authorization: `Bearer ${params.token}`,
                },
            };
            const url = "https://assignment3-mobiledev-nhom1-busappapi.onrender.com/users/" + params.username
            const response = await axios.get(url, config);
            console.log("respone: ", response.data)

            return response.data
        }
        catch (error) {
            console.log(error)
            return {
                message: "error"
            }
        }
    })

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: "",
        email: "",
        name: "",
        username: "",
        picture: "",
        phone: "",
        loading: false,
        error: ""
    },
    reducers: {
        logout: (state: any) => {
            return { ...state, ...initialState }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getGoogleUser.pending, (state) => {
            state.loading = true
        }),

            builder.addCase(getGoogleUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.email = payload.email
                state.name = payload.name
                state.picture = payload.picture
                state.phone = payload.phone
            }),

            builder.addCase(getGoogleUser.rejected, (state) => {
                state.loading = false
            })


        builder.addCase(getFacebookUser.pending, (state) => {
            state.loading = true
        }),

            builder.addCase(getFacebookUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.email = payload.email
                state.name = payload.name
                state.picture = payload.picture.data.url
                state.phone = payload.phone || ""
            }),

            builder.addCase(getFacebookUser.rejected, (state) => {
                state.loading = false
            })

        builder.addCase(getUserDB.pending, (state) => {
            state.loading = true
        }),

            builder.addCase(getUserDB.fulfilled, (state, { payload }) => {
                state.loading = false
                state.email = payload.email || ""
                state.name = payload.name
                state.phone = payload.phone || ""
                state.id = payload.id || ""
                state.username = payload.username || ""
            }),

            builder.addCase(getUserDB.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload?.message || ""
            })

        builder.addCase(updateUserInfo.pending, (state) => {
            state.loading = true
        }),

            builder.addCase(updateUserInfo.fulfilled, (state, { payload }) => {
                state.loading = false
                state.email = payload.email || ""
                state.name = payload.name
                state.phone = payload.phone || ""
            }),

            builder.addCase(updateUserInfo.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload?.message || ""
            })
    },
})

export const { logout } = userSlice.actions;
export const UserReducers = userSlice.reducer;