import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../store/authSlice";
import authService from "../appwrite/Auth";
import { Button, Input, Logo } from "./index";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const account = await authService.createAccount(data);
      if (account) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(login(currentUser));
        navigate("/");
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
        Create an Account
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Already have one?{" "}
        <Link
          to="/login"
          className="text-fuchsia-600 font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>

      {error && (
        <p className="text-red-600 mb-4 text-center font-medium">{error}</p>
      )}

      <form onSubmit={handleSubmit(create)} className="space-y-5">
        <Input
          label="Full Name"
          placeholder="e.g. Jane Doe"
          {...register("name", { required: true })}
        />
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
          Create Account
        </Button>
      </form>
    </div>
  );
}

export default Signup;
