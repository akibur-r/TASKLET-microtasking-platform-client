import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div>
      <h1>you're not allowed to view this page</h1>
      <div>
        <Link to={"/dashboard"} className="underline">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
