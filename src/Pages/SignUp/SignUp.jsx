import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../Providers/AuthProvider";

const SignUp = () => {
  const [error, setError] = useState("");
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    form.reset();

    // console.log(email, password, confirm);
    setError("");
    if (password !== confirm) {
      setError("Did not matched password");
      return;
    } else if (password < 6) {
      setError("Password must be 6 or grater");
    }

    createUser(email, password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        navigate("/");
      })
      .catch(err => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <form onSubmit={handleSignUp}>
      <div className="hero">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold w-96">Sign Up</h1>
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
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  name="confirm"
                  placeholder="Confirm Password"
                  className="input input-bordered"
                />
              </div>
              <p className="text-warning">{error}</p>
              <div className="form-control mt-6">
                <button className="btn bg-[#FF9900] border-none hover:bg-[#ca8a04]">
                  Sign Up
                </button>
              </div>
              <label className="labe label-text-alt mt-2 ml-14 text-md">
                <span className="">Already have an account? </span>
                <Link
                  to="/login"
                  className=" text-center text-[#FF9900] link link-hover"
                >
                  Login
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

export default SignUp;
