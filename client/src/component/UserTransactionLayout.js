import { Outlet } from "react-router-dom";

import { UserTransaction } from "./UserTransaction";


export const UserTransactionLayout = () => {
  return (
    <div>
      <UserTransaction />
      <Outlet /> {/* This will render the nested route components */}
    </div>

  );
};