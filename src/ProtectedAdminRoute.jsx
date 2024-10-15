import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Get current time in seconds

    // Check if the token has expired
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("adminToken"); // Remove expired token
      return <Navigate to="/adminrequestotp" />; // Redirect to OTP requestcation
    }

    return children; // If the token is valid, render the admin page
  } else {
    return <Navigate to="/adminrequestotp" />; // If no token, redirect to OTP verification
  }
};

export default ProtectedAdminRoute;
