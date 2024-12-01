import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/User";
import { SongData } from "../context/Song";

const headingText = "Login to RhythmNet";

const Login = () => {
  // states for storing the data from login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // accept all the data from user context i.e fn name UserData()
  const { loginUser, btnLoading } = UserData();

  // accept all the data from Song context i.e fn name SongData()
  const { fetchSongs, fetchAlbums } = SongData();

  // navigate function to navigate from one route to another route
  const navigate = useNavigate();

  // form submit handler
  const submitHandler = (e) => {
    // to stop the page reload of the form after submisson of form
    e.preventDefault();

    // for checking all the values in console
    // console.log(email, password);
    // send the essential data
    loginUser(email, password, navigate, fetchSongs, fetchAlbums);
  };

  return (
    <div className="flex items-center justify-center h-screen max-h-screen">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* heading text */}
        <h2 className="text-3xl font-semibold text-center mb-8">
          {headingText}
        </h2>

        {/* form section */}
        {/* on submiting the form the submitHandler function will be called */}
        <form className="mt-8" onSubmit={submitHandler}>
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
              // value as email
              value={email}
              // and on typing the email value should be print or written
              onChange={(e) => setEmail(e.target.value)}
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
              // value as password
              value={password}
              // on typing the password value should be print or written
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* btn for submit or Login */}
          <button
            // set btn disabled until BtnLoading is there
            disabled={btnLoading}
            className="auth-btn"
          >
            {/* condition if btnLoading is there show please wait message if not show register */}
            {btnLoading ? "Please Wait..." : "Login"}
          </button>
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
