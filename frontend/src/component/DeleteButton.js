import { Button, Image } from "react-bootstrap";

export const DeleteButton = ({ handleDelete }) => {
  return (
    <Button
      className="cross-button"
      variant="outline-primary"
      onClick={handleDelete}
    >
      <Image
        className="cross-button-image"
        src="/cross-button.png"
        alt="Cross Button"
        roundedCircle
      />
    </Button>
  );
};
