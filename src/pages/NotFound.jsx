import { Link } from "react-router";

function NotFound() {
  return (
    <>
      <div className="card">
        <p>Go back to the dashboard.</p>
        <Link to="/">Return Home</Link>
      </div>
    </>
  );
}

export default NotFound;
