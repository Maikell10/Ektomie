import { createSlice, configureStore } from "@reduxjs/toolkit";

import { signOut, getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { app } from "../config/firebase-config";

export const auth = getAuth(app);
export const db = getFirestore(app);
export const logOut = signOut(auth);

export const resetPassword = async (email) =>
    sendPasswordResetEmail(auth, email);

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        user: null,
        value: 0,
    },
    reducers: {
        setUser: (state, user) => {
            state.user = user;
        },
        setValue: (state, value) => {
            state.value = value;
        },
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const store = configureStore({
    reducer: counterSlice.reducer,
});

export const { setUser, setValue } = counterSlice.actions;
