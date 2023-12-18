import { NavLink, useRouteError } from "react-router-dom";
import errorImg from "../assets/images/404.jpg";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${errorImg})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h2 className="text-7xl font-bold">{error.status}</h2>
            <p className="text-5xl font-semibold text-center mt-10">
              Not Found
            </p>
            <NavLink className="btn btn-neutral mt-10" to="/">
              <button>Back To Home</button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10"></div>
    </>
  );
};

export default ErrorPage;
