import { configureStore } from "@reduxjs/toolkit";
import noteIdReducer from "./noteIdSlice";
import menuVisibilityReducer from "./menuVisibilitySlice";
import requiredNoteReducer from "./requiredNoteSlice";

const store = configureStore({
    reducer: {
        noteIdReducer,
        menuVisibilityReducer,
        requiredNoteReducer,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;