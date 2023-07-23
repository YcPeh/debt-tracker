import { Route, Routes } from "react-router-dom"
import { UserTransaction } from "./UserTransaction"
import { UserTransactionForm } from "./UserTransactionForm"
import { UserTransactionLayout } from "./UserTransactionLayout"

export const UserTransactionRoutes = () => {
    return(
        <Routes>
            <Route element={<UserTransactionLayout />}>
                {/* <Route index element={<UserTransaction />} /> */}
                <Route path="userTransactionForm" element={<UserTransactionForm/>} />
            </Route>
        </Routes>
    )
}