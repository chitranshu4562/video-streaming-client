import {configureStore} from "@reduxjs/toolkit";
import authDataReducer from "./features/authDataSlice.js";

const store = configureStore({
    reducer: {
        authData: authDataReducer,
    }
});

export const dispatch = store.dispatch;
export default store;
