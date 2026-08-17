import { configureStore } from "@reduxjs/toolkit";
import { editorStateReducer } from "@/widgets/tip-tap";

export const makeStore = () => {
    return configureStore({
        reducer: {
            editorStateReducer,
        }
    });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];