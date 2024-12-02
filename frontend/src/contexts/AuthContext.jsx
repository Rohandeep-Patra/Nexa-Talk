import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import server from "../utils/environment.js";

export const AuthContext = createContext({});

const client = axios.create({
  // baseURL: `${server}/v1/users`,
  baseURL: "http://localhost:8080/v1/users",
  headers: {
    "Content-Type": "application/json",
  },
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (name, username, password) => {
    try {
      const response = await client.post("/register", {
        name,
        username,
        password,
      });

      if (response.status === httpStatus.CREATED) {
        return response.data.message;
      }
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data.message || "Registration failed");
      } else {
        throw new Error("Something went wrong during registration");
      }
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await client.post("/login", { username, password });

      if (response.status === httpStatus.OK) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        setUserData({ username });
        navigate("/home");
      }
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data.message || "Login failed");
      } else {
        throw new Error("Something went wrong during login");
      }
    }
  };

  const getHistoryOfUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await client.get("/get_all_activity", {
        params: { token },
      });
      return response.data;
    } catch (err) {
      if (err.response) {
        throw new Error(
          err.response.data.message || "Failed to fetch user history"
        );
      } else {
        throw new Error("Something went wrong while fetching history");
      }
    }
  };

  const addToUserHistory = async (meetingCode) => {
    try {
      const token = localStorage.getItem("token");
      const response = await client.post("/add_to_activity", {
        token,
        meeting_code: meetingCode,
      });
      return response.data;
    } catch (err) {
      if (err.response) {
        throw new Error(
          err.response.data.message || "Failed to add to user history"
        );
      } else {
        throw new Error("Something went wrong while adding to history");
      }
    }
  };

  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
    getHistoryOfUser,
    addToUserHistory,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
