import React, { useState } from "react";

type Actor = {
  first_name: string;
  Actor_id: number;
  last_name: string;
};

interface ActorCardProps {
  Actors: Actor[];
  label: string;
}

const FlimsCard: React.FC<ActorCardProps> = ({ Actors, label }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-sm mx-auto p-4">
      <div
        onClick={() => setOpen(!open)}
        className="bg-black/20 shadow-lg rounded-2xl p-4 cursor-pointer transition"
      >
        <h2 className="text-xl font-bold text-white-800">{label}</h2>
      </div>

      {open && (
        <div className="mt-4 bg-black/20 p-4 rounded-2xl shadow-inner transition-all duration-500">
          {Actors.length === 0 ? (
            <p className="text-gray-500">No Actors found</p>
          ) : (
            <div>
              {Actors.map((Actor) => (
                <div
                  key={Actor.Actor_id}
                  className=" border-b-black text-center hover:bg-black hover:text-white hover:rounded-xl"
                >
                  <div className="text-white font-semibold cursor-pointer ">
                    {Actor.first_name}
                  </div>{" "}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FlimsCard;
