import React from "react";
import { Button } from "../components/shared/Button";
import { Link } from "react-router-dom";

export default function Start({
  producerColor,
  distributorColor,
  organizerColor,
  transporterColor,
  vendorColor,
  warehouseColor,
}) {
  return (
    <main className="flex flex-col justify-start h-full w-full">
      <div className="flex flex-1 flex-col justify-start pt-32 pb-16 pl-16 pr-4">
        <h1 className="text-5xl font-bold text-green-600">hello</h1>
        <h6 className="text-xl">welcome to collect!</h6>
        <br />
        <p>
          Please explore the proof of concept or visit the walkthrough 
          if you'd like to understand more about how this works.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col">
          <Link
            to="producer"
            className={`m-2 p-3 border-2 border-producer-400`}
          >
            <h1 className="self-center">Producer</h1>
          </Link>
          <Link
            to="distributor"
            className={`m-2 p-3 border-2 border-distributor-400`}
          >
            <h1 className="self-center">Distributor</h1>
          </Link>
          <Link
            to="organizer"
            className={`m-2 p-3 border-2 border-organizer-400`}
          >
            <h1 className="self-center">Organizer</h1>
          </Link>
        </div>
        <div className="flex flex-col">
          <Link
            to="transporter"
            className={` m-2 p-3 border-2 border-transporter-400`}
          >
            <h1 className="self-center">Transporter</h1>
          </Link>
          <Link
            to="vendor"
            className={`m-2 p-3 border-2 border-vendor-400`}
          >
            <h1 className="self-center">Vendor</h1>
          </Link>
          <Link
            to="warehouse"
            className={`m-2 p-3 border-2 border-warehouse-400`}
          >
            <h1 className="self-center">Warehouse</h1>
          </Link>
        </div>
      </div>
    </main>
  );
}

Start.propTypes = {};
