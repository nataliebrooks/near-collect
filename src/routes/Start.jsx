import React from "react";
import { Button } from "../components/shared/Button";
import { Link } from "react-router-dom";

export default function Start() {
  return (
    <main className="flex flex-col justify-start h-full w-full">
      <div className="flex flex-1 flex-col justify-start pt-32 pb-16 pl-16 pr-4">
        <h1 className="text-5xl font-bold text-green-600">hello</h1>
        <h6 className="text-xl">welcome to collect!</h6>
        <br />
        <p>
          The apps below combine to effectively “collect”, categorize, and label
          items into an easily queryable “database” of real, existing, and
          available after market products.
        </p>
        <br />
        <p>
          Then any sort of marketplace, service, tool, etc.. can be built atop
          this massive inventory. And this inventory could really hold anything…
          not only clothing, electronics, and furniture.
        </p>
        <br />
        <p>
          Please explore the proof of concept to understand more about how this
          works.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col">
          <Link to="producer" className={`m-2 p-3 border-2 border-red-400`}>
            <h1 className="self-center">Producer</h1>
          </Link>
          <Link to="organizer" className={`m-2 p-3 border-2 border-yellow-400`}>
            <h1 className="self-center">Organizer</h1>
          </Link>
          <Link to="storage" className={`m-2 p-3 border-2 border-purple-400`}>
            <h1 className="self-center">Storage</h1>
          </Link>
        </div>
        <div className="flex flex-col">
        <Link
            to="distributor"
            className={`m-2 p-3 border-2 border-orange-400`}
          >
            <h1 className="self-center">Distributor</h1>
          </Link>
          <Link
            to="transporter"
            className={` m-2 p-3 border-2 border-green-400`}
          >
            <h1 className="self-center">Transporter</h1>
          </Link>
          <Link to="vendor" className={`m-2 p-3 border-2 border-blue-400`}>
            <h1 className="self-center">Vendor</h1>
          </Link>
        </div>
      </div>
    </main>
  );
}

Start.propTypes = {};
