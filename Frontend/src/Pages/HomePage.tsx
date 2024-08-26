import React from "react";
import { Link } from "react-router-dom";
import signInImage from "../assets/signin.png";
import signUpImage from "../assets/signup.jpg";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#D72638] to-[#FF5E5B] flex items-center justify-center">
      <div className="max-w-screen-md mx-auto p-10 bg-white rounded-lg shadow-2xl text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Welcome to Our App
        </h1>
        <p className="text-gray-600 mb-10">
          Join our community by signing up or log in to continue. We're glad to
          have you here!
        </p>
        <div className="flex items-center justify-center gap-8">
          <Link
            to="/login"
            className="group relative block overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105 hidden md:block"
          >
            <img
              src={signInImage}
              alt="Sign In"
              className="w-48 h-48 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300">
              <span className="text-white font-bold text-lg">Sign In</span>
            </div>
          </Link>
          <Link
            to="/register"
            className="group relative block overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105 hidden md:block"
          >
            <img
              src={signUpImage}
              alt="Sign Up"
              className="w-48 h-48 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300">
              <span className="text-white font-bold text-lg">Sign Up</span>
            </div>
          </Link>
          <div className="md:hidden flex flex-row items-center gap-4">
            <Link
              to="/login"
              className="text-lg font-bold text-white bg-[#D72638] hover:bg-[#a61e2b] px-6 py-3 rounded-full transition duration-300"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-lg font-bold text-white bg-[#D72638] hover:bg-[#a61e2b] px-6 py-3 rounded-full transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
