import { configureStore } from "@reduxjs/toolkit";
import noteIdReducer from "./noteIdSlice";

const store = configureStore({
    reducer: {
        noteIdReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;