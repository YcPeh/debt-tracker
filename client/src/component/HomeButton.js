import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const HomeButton = ({linkToRoute}) => {
    return(
        <Button className='home-button' variant='outline-primary'>
          <Link to={linkToRoute}>
            <Image
              className='home-button-image'
              src='home.jpg'
              alt='Home Button'
              roundedCircle
            />
          </Link>
        </Button>
    )
}