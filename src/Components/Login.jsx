import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../store/authSlice";
import authService from "../appwrite/Auth";
import { Button, Input, Logo } from "./index";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const handleLogin = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
          console.log("User logged in:", userData);
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
      <div className="mb-4 flex justify-center">
        <span className="inline-block w-24">
          <Logo width="100%" />
        </span>
      </div>
      <h2 className="text-3xl font-bold text-center text-indigo-800 mb-1">
        Welcome Back
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="text-fuchsia-600 font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>

      {error && (
        <p className="text-red-600 mb-4 text-center font-medium">{error}</p>
      )}

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
        <Input
          label="Email Address"
          placeholder="e.g. jane@example.com"
          type="email"
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Enter a valid email address",
            },
          })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          {...register("password", { required: true })}
        />
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:scale-[1.02] transition-transform"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default Login;
