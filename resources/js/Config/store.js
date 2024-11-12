import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { logoutReducer } from "@/Features/auth/authSlice";
import authSlice from "@/Features/auth/authSlice";
import noteSlice from "@/Features/note/noteSlice";

const persistConfig = {
    key: "root",
    storage,
};

const reducers = combineReducers({
    auth: authSlice,
    note: noteSlice,
});

const rootReducer = (state, action) => {
    if (action.type === logoutReducer.type) {
        state = undefined;
    }
    return reducers(state, action);
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
let persistor = persistStore(store);

export { store, persistor };
