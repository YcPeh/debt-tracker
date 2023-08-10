import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export const HomeButton = ({ handleHome }) => {
  return (
    <Button
      className="home-button"
      variant="outline-primary"
      onClick={handleHome}
    >
      {/* <Link to={linkToRoute} state={propsToPass}> */}
      <Image
        className="home-button-image"
        src="/home.jpg"
        alt="Home Button"
        roundedCircle
      />
      {/* </Link> */}
    </Button>
  );
};
