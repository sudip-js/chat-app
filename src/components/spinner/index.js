import { Spinner } from "react-bootstrap";

export const GrowSpinner = () => {
  return (
    <div className="d-flex align-items-center gap-1">
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" />
    </div>
  );
};
