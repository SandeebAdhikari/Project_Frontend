import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Film, Users, Home, Menu, X } from "lucide-react";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/films", label: "Films", icon: Film },
    { path: "/customers", label: "Customers", icon: Users },
  ];

  return (
    <div className="p-6 fixed sm:py-6 sm:px-16 flex justify-between w-full items-center z-50 bg-gradient-to-b rounded-sm from-gray-500 via-gray-700 to-transparent">
      <div className="flex font-bold text-2xl items-center">
        <Film size={52} className="text-gray-400" />
        <div className="flex flex-col items-start">
          <div className="text-lg text-gray-300">Movies</div>
          <div className="text-gray-300 text-lg -mt-2">
            REN<span className="text-gray-400">TALS</span>
          </div>
        </div>
      </div>

      <button
        className="sm:hidden block text-2xl font-bold"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div
        className={`${
          open ? "block" : "hidden"
        } sm:flex flex flex-col sm:flex-row text-center sm:gap-5 fixed sm:static top-14 right-4 gap-1 rounded-lg p-2 sm:p-0 bg-gradient-to-br from-gray-700 via-gray-800 border border-gray-500 sm:border-none sm:bg-none`}
      >
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-2 font-bold rounded-xl px-4 py-2 transition text-gray-400
              ${
                isActive
                  ? "bg-gradient-to-br from-gray-700 via-gray-800 to-gray-950 text-gray-300 border-r-1 border-b-1 border-gray-500"
                  : "hover:bg-gradient-to-bl from-gray-600 via-gray-700 to-gray-800 hover:text-gray-300"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
