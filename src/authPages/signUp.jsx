import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    name: "",
    phone: "",
    companyName: "",
    companyEmail: "",
    employeeSize: "",
  });

  const handle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setformData((prevVal) => ({ ...prevVal, [name]: value }));
  };

  const fetchData = async () => {
    const response = await fetch("https://cuvette-backend-sv0l.onrender.com/api/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const val = await response.json();
    
    if (val.success) {
      localStorage.setItem("token", val.token);
      navigate('/verifyPage');
    }
  };

  const submit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleLoginClick = () => {
    console.log("click");
    
    navigate("/login"); // Explicitly navigate to the login page
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1  p-10">
        <h1 className="text-3xl font-bold mb-4">Welcome to Our Service!</h1>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
          nesciunt. Explicabo molestias reprehenderit nam iure id? Ut, a enim,
          sunt illo harum similique temporibus impedit quas quo necessitatibus
          sit alias, saepe natus recusandae sequi officia quasi labore ipsam rem
          consectetur!
        </p>
      </div>

      <div className="flex-1 flex justify-center items-center ">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <p className="text-sm text-center text-gray-500 mb-4">
            Join us to start your journey! Fill out the form below to get
            started.
          </p>
          <form onSubmit={submit}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handle(e)}
              />
            </div>

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
                onChange={(e) => handle(e)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="company"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="companyName"
                placeholder="Enter your company name"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handle(e)}
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
                onChange={(e) => handle(e)}
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="size"
              >
                Employee Size
              </label>
              <input
                type="text"
                id="size"
                name="employeeSize"
                placeholder="Enter employee size"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handle(e)}
              />
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">
              By clicking on proceed you will accept our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms & Conditions
              </a>
            </p>
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Proceed
              </button>
            </div>
            <div className="mt-1">
  <button 
    type="button" 
    className="text-md cursor-pointer text-blue-600 hover:underline" 
    onClick={handleLoginClick}
  >
    Login
  </button>
</div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
