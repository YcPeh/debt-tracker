import { Col, Image } from "react-bootstrap"
// import '../styles.css';

export const UserProfile = (user) => {
    return (
        <Col key={user.id} xs={4}>
            <div className="divContainerUser">
                <Image
                    className='userImage'
                    src={user.path}
                    alt={user.name}
                    roundedCircle
                />
            </div>
            <h5>{user.name}</h5>
        </Col>
    )
}