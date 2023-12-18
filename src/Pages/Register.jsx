import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, upadateUserProfile } = useAuth();
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    e.target.reset();

    if (password.length < 6) {
      Swal.fire(
        "Failed!",
        "Password should be at least 6 characters or more!!!",
        "error"
      );
      return;
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      Swal.fire(
        "Failed!",
        "Password must contain at least one uppercase, special characters...",
        "error"
      );
      return;
    }

    createUser(email, password)
      .then((res) => {
        upadateUserProfile(name, photo).then(() => {
          Swal.fire("Success!", "User created successfully!", "success");
          navigate("/");
          console.log(res.user);
        });
      })
      .catch((err) => {
        Swal.fire("Error!", err.message, "error");
        console.log(err);
      });
  };
  return (
    <div>
      <Helmet>
        <title>Galaxy Luxury Hotel | Register </title>
      </Helmet>
      <div className="">
        <div className="hero min-h-screen ">
          <div className="hero-content flex-col">
            <div className="card flex-shrink-0 md:w-[550px] h-[620px] shadow-2xl">
              <div className="text-center">
                <h1 className="text-2xl lg:text-3xl font-bold mt-10">
                  Register your account
                </h1>
              </div>
              <form onSubmit={handleRegister} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Your Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="input bg-[#F3F3F3] text-xs"
                    name="name"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your photo url"
                    className="input bg-[#F3F3F3] text-xs"
                    name="photo"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="input bg-[#F3F3F3] text-xs"
                    name="email"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="input bg-[#F3F3F3] text-xs"
                    name="password"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn bg-[#AA8453] text-white border-none">
                    Register
                  </button>
                </div>
                <div className="text-center mt-3">
                  <p className=" text-sm font-medium">
                    Already have an account?
                    <Link to="/login">
                      <span className="text-[#AA8453] text-sm font-semibold">
                        Login Now
                      </span>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
