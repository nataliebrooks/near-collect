import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function TransporterDashboard() {
  return (
    <main className="flex flex-col justify-start h-full w-full">
      <div className="flex flex-1 flex-col justify-start pt-32 pb-16 pl-16 pr-4">
        <h1 className="text-5xl font-bold text-green-600">transport</h1>
        <h6 className="text-xl">for the common good.</h6>
        <br />
        <p>
          When a Producer accepts an order, a Customer creates an order, or items are organized into storage, a transport request is created.
          Transporters pick up orders and deliver items.
        </p>
      </div>
      <footer className="flex flex-1 flex-col justify-start pt-16 pb-16 px-4">
        <div className="flex">
          <Link
            to="orders"
            className="flex-1 m-2 bg-transparent shadow-lg hover:shadow-sm hover:bg-black  hover:text-green-500 py-2 px-4 border-2 border-black hover:border-transparent"
          >
            <h6 className="text-xl">orders</h6>
          </Link>
        </div>
      </footer>
    </main>
  );
}

TransporterDashboard.propTypes = {};
