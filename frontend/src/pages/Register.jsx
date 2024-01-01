import kanbanLogo from "../assets/kanban-logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../redux/features/auth/authSlice.js";
import Loading from "../components/Loading";
import { useEffect } from "react";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate("/boards");
        }
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChangeHandler = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        await dispatch(register(formData));
        await dispatch(reset());
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="flex w-screen flex-col items-center justify-center h-screen bg-very-dark-grey">
            <Link
                to="/"
                className="flex items-center gap-2 text-2xl font-semibold text-white-color mb-6"
            >
                <img src={kanbanLogo} />
                Kanban
            </Link>
            <form
                onSubmit={(e) => onSubmitHandler(e)}
                className="border border-dark-border rounded-md flex flex-col w-[425px] px-8 py-6 bg-dark-grey"
            >
                <h1 className="text-2xl text-white-color font-semibold">
                    Sign up
                </h1>

                <div className="w-full flex flex-col items-start gap-2 mt-4">
                    <label
                        htmlFor="name"
                        className="text-sm text-white-color font-medium"
                    >
                        Name
                    </label>
                    <input
                        type="name"
                        name="name"
                        id="name"
                        onChange={onChangeHandler}
                        placeholder="John"
                        className="w-full border border-dark-border outline-none text-white-color bg-dark-grey rounded-lg p-2"
                    />
                </div>

                <div className="w-full flex flex-col items-start gap-2 mt-4">
                    <label
                        htmlFor="email"
                        className="text-sm text-white-color font-medium"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={onChangeHandler}
                        placeholder="name@company.com"
                        className="w-full border border-dark-border outline-none text-white-color bg-dark-grey rounded-lg p-2"
                    />
                </div>
                <div className="w-full flex flex-col items-start gap-2 mt-4">
                    <label
                        htmlFor="password"
                        className="text-sm text-white-color font-medium"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={onChangeHandler}
                        placeholder="••••••"
                        className="w-full border border-dark-border outline-none text-white-color bg-dark-grey rounded-lg p-2"
                    />
                </div>

                <div className="flex items-center justify-between mt-6">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300  accent-main-purple focus:ring-main-purple"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label
                                htmlFor="remember"
                                className="text-white-color font-medium"
                            >
                                Remember me
                            </label>
                        </div>
                    </div>
                    <a className="text-sm font-semibold cursor-pointer text-main-purple hover:underline">
                        Forgot password?
                    </a>
                </div>
                <button
                    type="submit"
                    className="w-full mt-6 text-white-color bg-main-purple transition hover:bg-main-purple-hover font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Sign up
                </button>
                <p className="text-sm font-normal text-medium-grey mt-4">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-main-purple hover:underline "
                    >
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
