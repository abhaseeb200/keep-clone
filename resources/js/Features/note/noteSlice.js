import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
    name: "auth",
    initialState: { notes: [] },
    reducers: {
        getNotesReducer: (state, action) => {
            return {
                ...state,
                notes: [...action.payload],
            };
        },
        createNoteReducer: (state) => {
            return {
                ...state,
                notes: [...action.payload, ...state.notes],
            };
        },
        updateNoteReducer: (state) => {
            let findIndex = state.notes.findIndex(i => i.id == action.payload)
            
            if (findIndex !== -1) {
                state.notes[findIndex] = action.payload
            }
            
            return {
                state,
            };
        },
        deleteNoteReducer: (state) => {
            let deletedNote = state.notes.filter((i) => i.id !== action.payload);
            return {
                ...state,
                notes: deletedNote
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
