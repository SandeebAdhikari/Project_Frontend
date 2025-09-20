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
        <Film size={28} color="red" /> <span>RENTALS</span>
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
        } sm:flex flex flex-col sm:flex-row text-center sm:gap-5 absolute sm:static top-14 right-4 bg-black/20 sm:bg-transparent rounded-lg p-2 sm:p-0`}
      >
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-2 font-bold rounded-xl px-4 py-2 transition 
              ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-900 hover:text-white"
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
