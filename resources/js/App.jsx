import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { store, persistor } from "./Config/store.js";
import AuthLayout from "@/Layouts/AuthLayout";
import MainLayout from "@/Layouts/MainLayout";
import LabelModal from "@/Components/LabelModal";
import SignIn from "@/Screens/sign-in";
import SignUp from "@/Screens/sign-up";
import ForgotPassword from "@/Screens/forgot-password";
import Dashboard from "@/Screens/dashboard";

function App() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <LabelModal closeModal={closeModal} isOpen={isOpen} />
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
                    <Route element={<MainLayout openModal={openModal} />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

ReactDOM.createRoot(document.getElementById("example")).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);
