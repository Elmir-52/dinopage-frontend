import { createSlice } from "@reduxjs/toolkit";

interface MenuVisibilityState {
    open: boolean;
}

const initialState: MenuVisibilityState  = {
    open: false,
}

const menuVisibilitySlice = createSlice({
    name: 'menuVisibility',
    initialState,
    reducers: {
        setMenuVisibility(state) {
            state.open = !state.open;
        }
    }
})

export const { setMenuVisibility } = menuVisibilitySlice.actions;

const menuVisibilityReducer = menuVisibilitySlice.reducer;
export default menuVisibilityReducer;