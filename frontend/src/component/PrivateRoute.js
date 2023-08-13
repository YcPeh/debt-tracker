import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { registrantInfo } = useSelector((store) => store.auth);
  // return registrantInfo ? <Outlet /> : <Navigate to="/login" replace />;
  return registrantInfo ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
