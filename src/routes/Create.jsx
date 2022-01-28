import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Items() {
  return (
    <main className="flex flex-1">
      <Link to ="/q1" className="flex-1 bg-green-500 hover:bg-green-700 leading-tight text-white">
        <h1>give to the common good</h1>
      </Link>
    </main>
  );
}

Items.propTypes = {};
