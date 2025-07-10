import { Navigate } from "react-router";

const Home = () => {
  return <Navigate to={"/auth/login"} />;
};

export default Home;
