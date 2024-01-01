import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Header from "./Header";
import { useState } from "react";

const PrivateRoute = () => {
    const { user } = useSelector((state) => state.auth);
    const [navbarOpen, setNavbarOpen] = useState(false);
    return user ? (
        <div className="flex w-screen h-screen">
            <Navbar navbarOpen={navbarOpen} navbarToggle={setNavbarOpen} />
            <div className="flex flex-col w-full h-screen">
                <Header navbarOpen={navbarOpen} />
                <Outlet context={navbarOpen} />
            </div>
        </div>
    ) : (
        <Navigate to="/login" replace />
    );
};
export default PrivateRoute;
