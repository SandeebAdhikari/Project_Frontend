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
    <div className="text-white p-4 sm:mx-16 flex justify-between items-center rounded-lg relative">
      <h1 className="font-bold text-2xl flex items-center">
        <Film size={28} color="red" />{" "}
        <span className="text-gray-300">RENTALS</span>
      </h1>
      <button
        className="sm:hidden block text-2xl font-bold"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div
        className={`${
          open ? "block" : "hidden"
        } sm:flex flex flex-col sm:flex-row text-center sm:gap-5 absolute sm:static top-14 right-4  rounded-lg p-2 sm:p-0`}
      >
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-2 font-bold rounded-xl px-4 py-2 transition text-gray-400
              ${
                isActive
                  ? "bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-gray-300"
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
