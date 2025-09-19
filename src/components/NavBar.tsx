import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-gray-800 text-white p-4 flex justify-end items-center relative">
      <button
        className="sm:hidden block text-2xl font-bold"
        onClick={() => setOpen(!open)}
      >
        {open ? "✖" : "☰"}
      </button>

      <div
        className={`${
          open ? "block" : "hidden"
        } sm:flex flex flex-col text-center sm:flex-row sm:gap-5 absolute sm:static top-14 right-4 sm:top-auto sm:right-auto bg-gray-700 sm:bg-transparent rounded-lg sm:rounded-none p-2 sm:p-0`}
      >
        <Link
          to="/films"
          className="hover:underline font-bold hover:bg-black/20 rounded-xl p-2"
        >
          Films
        </Link>
        <Link
          to="/customers"
          className="hover:underline font-bold hover:bg-black/20 rounded-xl p-2"
        >
          Customers
        </Link>
        <Link
          to="/actors"
          className="hover:underline font-bold hover:bg-black/20 rounded-xl p-2"
        >
          Actors
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
