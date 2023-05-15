import React, { useContext } from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  // console.log(user?.email);

  const handleLogOut = () => {
    logOut()
      .then(result => {
        // Sign-out successful.
      })
      .catch(error => {
        console.log(error.message);
      });
  };
  const menuBar = (
    <>
      <li>
        <Link to="/">Shop</Link>
      </li>
      <li>
        <Link to="/orders">Order</Link>
      </li>
      <li>
        <Link to="/inventory">Inventory</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signUp">SignUp</Link>
      </li>
      <li>
        {user && (
          <span>
            Welcome{user?.email}
            <button onClick={handleLogOut}>SignOut</button>
          </span>
        )}
      </li>
    </>
  );

  return (
    <div className="mx-48">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuBar}
            </ul>
          </div>
          <Link to="/" className=" normal-case text-xl">
            <img className="w-32 h-12" src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menuBar}</ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
