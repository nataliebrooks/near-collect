import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "../components/shared/Button";

export default function ProducerDashboard() {
  return (
    <>
      <main className="flex flex-col justify-start h-full w-full">
        <div className="flex flex-1 flex-col justify-start pt-16 pl-4 pr-4">
          <Link to="/camera" className="shadow-2xl hover:shadow-lg rounded-lg py-16 pl-12 hover:-translate-y-0.5">
            <h1 className="text-5xl font-bold text-green-600">produce</h1>
            <h6 className="text-xl">for the common good.</h6>
            <br />
            <p>
              Click here to take a picture of a "pile" of items you want to give
              to the common good. A distributor will offer to take your pile.
            </p>
          </Link>
        </div>
        <footer className="flex flex-1 flex-col justify-start pt-16 pb-16 px-4">
          <div className="pl-12 pb-4">
            <p>
              Or click below to view orders from distributors, or the piles
              you have minted.
            </p>
          </div>
          <div className="flex">
            <Link
              to="orders"
              className="flex-1 m-2 bg-transparent shadow-lg hover:shadow-sm hover:bg-black  hover:text-green-500 py-2 px-4 border-2 border-black hover:border-transparent"
            >
              <h6 className="text-xl">orders</h6>
            </Link>
            <Link
              to="items"
              className={
                "flex-1 m-2 bg-transparent shadow-lg hover:shadow-sm  hover:bg-black  hover:text-green-500 py-2 px-4 border-2 border-black hover:border-transparent"
              }
            >
              <h6 className="text-xl">piles</h6>
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
}

ProducerDashboard.propTypes = {};
