import { createSlice } from "@reduxjs/toolkit";

export const labelSlice = createSlice({
    name: "label",
    initialState: { labels: [] },
    reducers: {
        getLabelReducer: (state, action) => {
            return {
                ...state,
                labels: [...action.payload],
            };
        },
        createLabelReducer: (state, action) => {
            console.log(action.payload);
            
            return {
                ...state,
                labels: [...state.labels, action.payload],
            };
        },
        updateLabelReducer: (state, action) => {
            let findIndex = state.labels.findIndex(
                (i) => i?.id == action.payload.id
            );

            if (findIndex !== -1) {
                state.labels[findIndex] = action.payload;
            }
        },
        deleteLabelReducer: (state, action) => {
            let deletedLabel = state.labels.filter(
                (i) => i.id !== action.payload
            );
            return {
                ...state,
                labels: deletedLabel,
            };
        },
    },
});

export const {
    getLabelReducer,
    createLabelReducer,
    updateLabelReducer,
    deleteLabelReducer,
} = labelSlice.actions;

export default labelSlice.reducer;
