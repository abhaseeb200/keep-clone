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
                notes: [action.payload, ...state.notes],
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
        updateBulkNoteReducer: (state, action) => {
            action?.payload?.forEach((updatedNote) => {
                const findIndex = state?.notes.findIndex(
                    (note) => note?.id === updatedNote?.id
                );

                if (findIndex !== -1) {
                    state.notes[findIndex] = updatedNote;
                }
            });
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
        deleteBulkNoteReducer: (state, action) => {
            let deletedNote = state.notes.filter(
                (note) => !action.payload.includes(note?.id)
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
    deleteBulkNoteReducer,
    updateBulkNoteReducer,
} = noteSlice.actions;

export default noteSlice.reducer;
