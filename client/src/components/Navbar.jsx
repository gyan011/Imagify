import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();

  // dropdown open state
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setProfileOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
  };

  return (
    <div className="flex items-center justify-between py-4">
      <Link to={"/"}>
        <img src={assets.logo} alt="Logo" className="w-28 sm:w-32 lg:w-40" />
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img src={assets.credit_star} alt="credits" className="w-5" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credits left : {credit}{" "}
              </p>
            </button>

            <p className="text-gray-600 max-sm:hidden pl-4">{user.name}</p>

            {/* Profile dropdown (click to toggle) */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="inline-flex items-center p-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-expanded={profileOpen}
                aria-haspopup="true"
                aria-label="Profile menu"
              >
                <img
                  src={assets.profile_icon}
                  alt="Profile"
                  className="w-10 drop-shadow cursor-pointer rounded-full"
                />
              </button>

              {/* Menu */}
              {profileOpen && (
                <div className="absolute top-12 right-0 z-10 text-black rounded pt-0">
                  <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm shadow-md w-36">
                    <li
                      onClick={handleLogout}
                      className="py-2 px-3 cursor-pointer pr-10 hover:bg-gray-100 rounded"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p onClick={() => navigate("/buy")} className="cursor-pointer">
              Pricing
            </p>

            <button
              className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full cursor-pointer"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
