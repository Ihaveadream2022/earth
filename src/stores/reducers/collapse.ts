import { createSlice } from "@reduxjs/toolkit";
import { StoreReducerStateCollapse } from "../../types";

const initialState: StoreReducerStateCollapse = {
    isCollapse: false,
};
const slice = createSlice({
    name: "collapse",
    initialState,
    reducers: {
        toggle: (state) => {
            state.isCollapse = !state.isCollapse;
        },
    },
});

export const { toggle } = slice.actions;

export default slice.reducer;
