import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "./UserProfile";
import { Row } from "react-bootstrap";
import { AddButton } from "./AddButton";


export const RenderUserProfiles = () => {
    const { userInfo } = useSelector((store) => store.user);

    console.log('userInfo inside MainContainer.js but outside of return statement')
    console.log(userInfo)
    const rows = [];
    if (userInfo.length > 0) {
        for (let i = 0; i < userInfo.length; i += 3) {
            const usersNum = userInfo.slice(i, i + 3).length

            let colWidthUser;
            let colWidthAddButton;
            if (usersNum === 1) {
                colWidthUser = 6;
                colWidthAddButton = 6;
            } else if (usersNum === 3) {
                colWidthUser = 4;
                colWidthAddButton = 12;
            } else {
                colWidthUser = 4;
                colWidthAddButton = 4;
            }
            console.log('renderUserProfiles for loop')
            const user3Columns = userInfo.slice(i, i + 3).map((user) => (
                <UserProfile key={user.customId} user={user} colWidthUser={colWidthUser} />
            ))

            const addButtonSameRow = (userInfo.length - i <= 3)

            const row = (
                <Row key={rows.length} className='mb-5'>
                    {user3Columns}
                    {addButtonSameRow &&
                        <AddButton colWidthAddButton={colWidthAddButton} divClassName={'divContainerAddButton'} linkToRoute={'/userRegisterForm'} />
                    }
                </Row>
            )
            rows.push(row);
        }
        return rows;
    } else {
        const row = (
            <Row key={rows.length} className='mb-5'>
                {/* <AddButton /> */}
                <AddButton colWidthAddButton={12} divClassName={'divContainerAddButton'} linkToRoute={'/userRegisterForm'} />
            </Row>
        )
        rows.push(row);
    }
    return rows;
};