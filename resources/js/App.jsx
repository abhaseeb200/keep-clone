import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { store, persistor } from "./Config/store.js";
import AuthLayout from "@/Layouts/AuthLayout";
import MainLayout from "@/Layouts/MainLayout";
import SignIn from "@/Screens/sign-in";
import SignUp from "@/Screens/sign-up";
import ForgotPassword from "@/Screens/forgot-password";
import Dashboard from "@/Screens/dashboard";
import User from "@/Screens/user";

function App() {
    return (
        <Router>
            <Routes>
                {/* =============== PUBLIC ROUTES =============== */}
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                </Route>

                {/* =============== PROTECTED ROUTES =============== */}
                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<User />} />
                </Route>
            </Routes>
        </Router>
    );
}

ReactDOM.createRoot(document.getElementById("example")).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);
