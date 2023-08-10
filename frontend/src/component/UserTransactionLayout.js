import { Outlet, useLocation } from "react-router-dom";

import { UserTransaction } from "./UserTransaction";

export const UserTransactionLayout = () => {
  const location = useLocation();
  console.log("location");
  console.log(location);
  return (
    <div>
      {/* <UserTransaction /> */}
      {location.pathname === "/userTransaction" ? null : <UserTransaction />}
      <Outlet />
    </div>
  );
};
