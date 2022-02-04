import React from "react";
import { Button } from "../components/shared/Button";

export default function DistributorDashboard() {
  return (
    <main className="flex flex-col h-full text-white">
      <Button
        to="items"
        className={`mx-4 mt-4 mb-2 bg-distributor-300 shadow-xl hover:shadow-lg hover:bg-distributor-400 hover:bg-orange-400 hover:-translate-y-1`}
      >
        <h1 className="text-2xl font-extrabold ">Items</h1>
      </Button>
      <Button
        to="orders"
        className={`mx-4 mt-2 mb-4 bg-distributor-300 shadow-xl hover:shadow-lg hover:bg-distributor-400 hover:bg-orange-400 hover:-translate-y-1`}
      >
        <h1 className="text-2xl font-extrabold">Orders</h1>
      </Button>
    </main>
  );
}

DistributorDashboard.propTypes = {};
