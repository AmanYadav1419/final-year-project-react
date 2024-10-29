import React from "react";
import { Link } from "react-router-dom";

const headingText = "Login to RhythmNet";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen max-h-screen">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* heading text */}
        <h2 className="text-3xl font-semibold text-center mb-8">
          {headingText}
        </h2>

        {/* form section */}
        <form className="mt-8">

          {/* email label and input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email or Username
            </label>
            <input
              type="email"
              placeholder="Email or Username"
              className="auth-input"
              required
            />
          </div>

          {/* password label and input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              required
            />
          </div>

          {/* btn for submit or Login */}
          <button className="auth-btn">Login</button>
        </form>

        {/* this div for redirect to register page if user don't have account*/}
        <div className="text-center mt-6">
          <Link
            to="/register"
            className="text-sm text-gray-400 hover:text-gray-300"
          >
            Don't have account? Register here 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
