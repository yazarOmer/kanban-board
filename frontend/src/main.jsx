import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Boards from "./pages/Boards.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/" element={<PrivateRoute />}>
                        <Route path="/boards" element={<Boards />} />
                        <Route path="/boards/:id" element={<Boards />} />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>
);
