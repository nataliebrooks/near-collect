import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "../components/shared/Button";

export default function ProducerDashboard() {
  return (
    <>
      <main className="flex flex-1 text-white">
        <div className="grow flex p-4">
          <Button
            to="/camera"
            className={`bg-producer-300 shadow-2xl hover:bg-producer-400 hover:shadow-xl hover:-translate-y-1`}
          >
              <h1 className="text-xl font-semibold">give to the common good</h1>
          </Button>
        </div>
      </main>
      <footer className="flex text-center h-32 text-white">
        <Button
          to="orders"
          className={`w-1/2 ml-4 mb-4 mr-2 bg-producer-300 shadow-lg hover:shadow-sm hover:bg-producer-400  hover:-translate-y-0.5`}
        >
          <h1 className="text-2xl font-extrabold">Orders</h1>
        </Button>
        <Button
          to="items"
          className={`w-1/2 ml-2 mb-4 mr-4 bg-producer-300 shadow-lg hover:shadow-sm hover:bg-producer-400  hover:-translate-y-0.5`}
        >
          <h1 className="text-2xl font-extrabold">Items</h1>
        </Button>
      </footer>
    </>
  );
}

ProducerDashboard.propTypes = {};
