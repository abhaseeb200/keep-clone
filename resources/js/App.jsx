import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./screens/sign-in";
import SignUp from "./screens/sign-up";
import Dashboard from "./screens/dashboard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

ReactDOM.createRoot(document.getElementById("example")).render(<App />);
