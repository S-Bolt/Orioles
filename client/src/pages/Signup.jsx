import logo from "../assets/BbLogo.png";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../utils/AuthContext";
import { API_BASE_URL } from "../config";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        //Call login funtion from AuthContext if login is sucessfull to update isAuthenticated
        signup(data.token);
        //navigate to dashboard or home
        navigate("/");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (error) {
      console.error({ error: "error occured", details: error.message });
      setError("An error occured during signup");
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src={logo}
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right: Login Form */}
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Signup</h1>
        <form onSubmit={handleSignup}>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-oriolesOrange"
              autoComplete="off"
              required
            />
          </div>

          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-oriolesOrange"
              autoComplete="off"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-oriolesOrange"
              autoComplete="off"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-oriolesOrange hover:bg-orange-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Register
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-blue-500 text-center">
          <a href="/login" className="hover:underline">
            Login instead
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
