import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
    name: "note",
    initialState: { notes: [] },
    reducers: {
        getNotesReducer: (state, action) => {
            return {
                ...state,
                notes: [...action.payload],
            };
        },
        createNoteReducer: (state, action) => {
            return {
                ...state,
                notes: [...action.payload, ...state.notes],
            };
        },
        updateNoteReducer: (state, action) => {
            let findIndex = state.notes.findIndex(
                (i) => i?.id == action.payload.id
            );

            if (findIndex !== -1) {
                state.notes[findIndex] = action.payload;
            }
        },
        deleteNoteReducer: (state, action) => {
            let deletedNote = state.notes.filter(
                (i) => i.id !== action.payload
            );
            return {
                ...state,
                notes: deletedNote,
            };
        },
    },
});

export const {
    getNotesReducer,
    createNoteReducer,
    updateNoteReducer,
    deleteNoteReducer,
} = noteSlice.actions;

export default noteSlice.reducer;
