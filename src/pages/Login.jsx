import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../backend/firebase/AuthContect";
const Login = ({ title }) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const navigate = useNavigate();
  const { signin } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      await signin(email, password);
    } catch (error) {
      setError("Failed to login");
    }
  }

  return (
    <div className="flex items-start justify-center min-h-screen">
      <div className="bg-white p-5 rounded-xl border shadow-lg max-w-md w-full mt-16">
        <h2 className="text-2xl font-medium mb-4 text-center text-[#dc3545]">
          {title} Login
        </h2>

        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-600 lg:mt-8 text-center">{error}</p>}
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
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
