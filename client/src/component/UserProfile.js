import { Col, Image } from "react-bootstrap"
import { useSelector } from "react-redux"
// import '../styles.css';

export const UserProfile = (user) => {
    // const {colWidthUser} = useSelector((store) => store.user)
    // const colWidthUser = usersNum === 1 ? 6 : 4
    // console.log(user)
    // console.log(colWidthUser)
    const base64String = btoa(
        String.fromCharCode(...new Uint8Array(user.image.data.data))
    );
    return (
        <Col xs={user.colWidthUser}>
            <div className="divContainerUser">
                <Image
                    className='userImage'
                    src={`data:image/png;base64,${base64String}`}
                    alt={user.name}
                    roundedCircle
                />
            </div>
            <h5>{user.name}</h5>
        </Col>
    )
}