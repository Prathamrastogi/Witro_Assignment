import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import signUpImage from "../assets/signup.jpg";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import InputField from "../Components/InputFields";
import axios from "axios";

// Define the shape of the form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  retypePassword: string;
  contactMode: "email" | "phone";
}

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRetypePassword, setShowRetypePassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    retypePassword: "",
    contactMode: "email",
  });
  const navigate = useNavigate();

  const togglePasswordVisibility =
    (field: "password" | "retypePassword") => () => {
      if (field === "password") {
        setShowPassword((prev) => !prev);
      } else if (field === "retypePassword") {
        setShowRetypePassword((prev) => !prev);
      }
    };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      retypePassword,
      contactMode,
    } = formData;

    if (password !== retypePassword) {
      toast.error("Passwords don't match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          firstName,
          lastName,
          email,
          password,
          contactMode,
        }
      );

      toast.success(response.data.message);
      navigate("/verify-otp", { state: { email } });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
      console.error("Registration error:", error.response?.data || error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/2 hidden lg:block">
        <img
          src={signUpImage}
          alt="Sign Up"
          className="object-cover h-full w-full"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#3A244A]">Register</h2>
            <Link
              to="/login"
              className="text-lg font-semibold text-[#3A244A] transition duration-300"
            >
              Sign{" "}
              <span className="text-lg font-semibold text-[#D72638] transition duration-300">
                In
              </span>
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <InputField
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <InputField
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>

            <InputField
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              icon={FaEye}
              showPassword={showPassword}
              onToggle={togglePasswordVisibility("password")}
              value={formData.password}
              onChange={handleInputChange}
            />

            <InputField
              type={showRetypePassword ? "text" : "password"}
              id="retypePassword"
              name="retypePassword"
              placeholder="Retype password"
              icon={FaEye}
              showPassword={showRetypePassword}
              onToggle={togglePasswordVisibility("retypePassword")}
              value={formData.retypePassword}
              onChange={handleInputChange}
            />

            <div className="mb-6">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="contactMode"
              >
                Contact Mode
              </label>
              <select
                id="contactMode"
                name="contactMode"
                className="w-full px-4 py-2 border-b border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-purple-600"
                value={formData.contactMode}
                onChange={handleInputChange}
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
            </div>

            <InputField
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className="w-full py-3 bg-[#D72638] text-white font-semibold rounded-md shadow-md"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
