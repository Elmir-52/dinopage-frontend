import { configureStore } from "@reduxjs/toolkit";
import noteIdReducer from "./noteIdSlice";
import menuVisibilityReducer from "./menuVisibilitySlice";

const store = configureStore({
    reducer: {
        noteIdReducer,
        menuVisibilityReducer,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;