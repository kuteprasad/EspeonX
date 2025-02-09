/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Loading from "./ui/loader";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();

  if (!isLoaded) {
    return <Loading size="large" text="Checking authentication..." />;
  }

  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" />;
  }

  return children;
};

export default ProtectedRoute;

