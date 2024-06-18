import React from "react";

const Login = ({ title, link }) => {
  return (
    <div className="flex items-start justify-center min-h-screen">
      <div className="bg-white p-5 rounded-xl border shadow-lg max-w-md w-full mt-16">
        <h2 className="text-2xl font-medium mb-4 text-center text-[#dc3545]">
          {title} Login
        </h2>
        <form>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
