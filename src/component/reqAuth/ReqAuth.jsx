import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../../context/Auth";

const ReqAuth = ({ children }) => {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/sign" state={{ path: location.pathname }} />;
  }
  return children;
};

export default ReqAuth;
