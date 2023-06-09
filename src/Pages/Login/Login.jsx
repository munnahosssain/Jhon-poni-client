import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../Providers/AuthProvider";

const Login = () => {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const { signInUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogIn = event => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);
    setError("");
    signInUser(email, password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        navigate("/");
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <form onSubmit={handleLogIn}>
      <div className="hero">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold w-96">Login now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="input input-bordered"
                />

                <p onClick={() => setShow(!show)}>
                  {show ? (
                    <span>Show password</span>
                  ) : (
                    <span>Hide password</span>
                  )}
                </p>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-[#FF9900] border-none hover:bg-[#ca8a04]">
                  Login
                </button>
              </div>
              <p>{error}</p>
              <label className="labe label-text-alt mt-2 ml-14 text-md">
                <span className="">New to Ema-john? </span>
                <Link
                  to="/signUp"
                  className=" text-center text-[#FF9900] link link-hover"
                >
                  Create New Account
                </Link>
              </label>
              <div className="flex flex-col w-full border-opacity-50">
                <div className="divider">OR</div>
              </div>
              <div className="form-control">
                <button className="btn btn-outline btn-accent text-white">
                  <FcGoogle size={28} />
                  <span className="ml-2">Continue with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
