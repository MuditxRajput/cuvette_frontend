// LoginForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    companyEmail: "",
  });
//   const token =
//  console.log(token);
 
  const handle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((preVal) => ({ ...preVal, [name]: value }));
  };

  const fetchData = async () => {
    const response = await fetch("https://cuvette-backend-sv0l.onrender.com/api/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const val = await response.json();

    if (val.success) {
      localStorage.setItem("token", val.token);
      toast("login success")
      navigate("/home");
    } else {
      // Handle login failure (e.g., show a toast notification)
      console.error(val.message);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-gray-700">
          Please log in to your account to continue.
        </p>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
          <form onSubmit={submit}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="phone"
              >
                Phone No.
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handle}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Company Email
              </label>
              <input
                type="email"
                id="email"
                name="companyEmail"
                placeholder="Enter your company email"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handle}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
