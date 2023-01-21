import React from "react";
import Spinner from "react-bootstrap/Spinner";

const LoadingScreen = () => {
  return (
    <div className="spinner">
      <Spinner animation="grow" />
    </div>
  );
};

export default LoadingScreen;
