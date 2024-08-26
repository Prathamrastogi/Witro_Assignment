import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import InputField from "../Components/InputFields";

const PasswordReset: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords don't match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No authentication token found");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data.message);
      navigate("/welcome");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-[#3A244A] mb-6">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <InputField
            type="password"
            id="currentPassword"
            name="currentpassword"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCurrentPassword(e.target.value)
            }
          />
          <InputField
            type="password"
            id="newPassword"
            name="newpassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewPassword(e.target.value)
            }
          />
          <InputField
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmNewPassword(e.target.value)
            }
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#D72638] text-white font-semibold rounded-md shadow-md mt-4"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
