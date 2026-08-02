import { configureStore } from "@reduxjs/toolkit";
import menuVisibilityReducer from "./menuVisibilitySlice";
import requiredNoteReducer from "./requiredNoteSlice";
import editorStateReducer from "./editorStateSlice";

const store = configureStore({
    reducer: {
        menuVisibilityReducer,
        requiredNoteReducer,
        editorStateReducer,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;