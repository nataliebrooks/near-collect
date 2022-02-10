import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function StorageDashboard() {
  return (
    <main className="flex flex-col justify-start h-full w-full">
      <div className="flex flex-1 flex-col justify-start pt-32 pb-16 pl-16 pr-4">
        <h1 className="text-5xl font-bold text-green-600">store</h1>
        <h6 className="text-xl">for the common good.</h6>
        <br />
        <p>
          Users can offer extra space they have in their home, repurposed commercial space, or warehouses.
          Organized items will be shipped to them for longer-term storage.
        </p>
      </div>
      <footer className="flex flex-1 flex-col justify-start pt-16 pb-16 px-4">
        <div className="flex">
          <Link
            to="items"
            className="flex-1 m-2 bg-transparent shadow-lg hover:shadow-sm hover:bg-black  hover:text-green-500 py-2 px-4 border-2 border-black hover:border-transparent"
          >
            <h6 className="text-xl">items</h6>
          </Link>
        </div>
      </footer>
    </main>
  );
}

StorageDashboard.propTypes = {};
