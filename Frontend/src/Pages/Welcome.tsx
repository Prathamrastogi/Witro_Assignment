import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  contactMode: string;
}

const Welcome: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to view this page");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "https://witro-assignment.onrender.com/api/auth/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data);
      } catch (error: any) {
        toast.error("Failed to fetch user data");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("You have been logged out");
    navigate("/");
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-[#3A244A] mb-6">
          Welcome, {userData.firstName}!
        </h2>
        <p className="mb-4">
          <span className="font-semibold">Name:</span> {userData.firstName}{" "}
          {userData.lastName}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Email:</span> {userData.email}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Preferred Contact Mode:</span>{" "}
          {userData.contactMode}
        </p>
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-[#D72638] text-white font-semibold rounded-md shadow-md mt-4"
        >
          Log Out
        </button>
        <Link to="/reset-password">
          <button className="w-full py-3 bg-[#3A244A] text-white font-semibold rounded-md shadow-md mt-4">
            Reset Password
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
