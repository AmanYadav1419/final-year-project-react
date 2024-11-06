import React from "react";
import { UserData } from "../context/User";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  // add a condition only who had admin acess can acess this admin page
  const { user } = UserData();

  // created a navigate function to navigate from one route to another route
  const navigate = useNavigate();

  // if user is not admin then return to home page
  if (user && user.role !== "admin") return navigate("/");
  return <div className="text-white">Admin</div>;
};

export default Admin;
