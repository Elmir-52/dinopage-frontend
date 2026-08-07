import { configureStore } from "@reduxjs/toolkit";
import menuVisibilityReducer from "./menuVisibilitySlice";
import requiredNoteReducer from "./requiredNoteSlice";
import editorStateReducer from "@/store/features/editorStateSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            menuVisibilityReducer,
            requiredNoteReducer,
            editorStateReducer,
        }
    });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];