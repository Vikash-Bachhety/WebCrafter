import React from "react";
import { NavLink } from "react-router-dom";

function Links({ text }) {
  return (
    <div>
      <NavLink to= {`/${text}`} className= " hover:text-yellow-200 font-serif sm:p-1.5 rounded-3xl border-2 border-transparent">
        {text}
      </NavLink>
    </div>
  );
}

export default Links;
