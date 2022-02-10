import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function VendorDashboard() {
  return (
    <main className="flex flex-col justify-start h-full w-full">
      <div className="flex flex-1 flex-col justify-start pt-32 pb-16 pl-16 pr-4">
        <h1 className="text-5xl font-bold text-green-600">vendors</h1>
        <h6 className="text-xl">for the common good.</h6>
        <br />
        <p>
          Once a Producer's pile has been fully organized, distributed, and
          stored, it becomes a part of an inventory of everything -- called "the
          common good".
        </p>
        <br />
        <p>
          This inventory can then be queried by vendors to create their own
          marketplaces, businesses, and missions.
        </p>
        <br />
        <p>
          Visit the inventory below and run the default query to see how this data is served,
          or explore the possibilities of what this "inventory of everything" and it's distribution network could enable creators to do.
          </p>
      </div>
      <footer className="flex flex-1 flex-col justify-start px-4">
        <div className="flex">
        <a
            href="https://thegraph.com/hosted-service/subgraph/elliotbraem/common-good"
            className="flex-1 m-2 bg-transparent shadow-lg hover:shadow-sm hover:bg-black  hover:text-green-500 py-2 px-4 border-2 border-black hover:border-transparent"
          >
            <h6 className="text-xl">inventory</h6>
          </a>
          <Link
            to="ideas"
            className={
              "flex-1 m-2 bg-transparent shadow-lg hover:shadow-sm  hover:bg-black  hover:text-green-500 py-2 px-4 border-2 border-black hover:border-transparent"
            }
          >
            <h6 className="text-xl">ideas</h6>
          </Link>
        </div>
      </footer>      
    </main>
  );
}

VendorDashboard.propTypes = {};
