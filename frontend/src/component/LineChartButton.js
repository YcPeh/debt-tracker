import React from "react";
import { Button, Image } from "react-bootstrap";

export const LineChartButton = ({ handleLineChartClick }) => {
  return (
    <Button
      className="line-chart"
      variant="outline-primary"
      onClick={handleLineChartClick}
    >
      <Image
        className="line-chart-image"
        src="/line-chart.png"
        alt="Line Chart"
        roundedCircle
      />
    </Button>
  );
};
