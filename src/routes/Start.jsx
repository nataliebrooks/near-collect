import React from "react";
import { Button } from "../components/shared/Button";

export default function Start({
  producerColor,
  distributorColor,
  organizerColor,
  transporterColor,
  vendorColor,
  warehouseColor,
}) {
  return (
    <main className="flex flex-col text-white text-lg text-center font-bold leading-6 h-full">
      <Button
        to="producer"
        className={`mt-4 mx-4 mb-2 bg-producer-400 shadow-xl hover:shadow-lg hover:bg-producer-400  hover:-translate-y-1`}
      >
        <h1 className="self-center">Producer</h1>
      </Button>
      <Button
        to="distributor"
        className={`my-2 mx-4 bg-distributor-400 shadow-xl hover:shadow-lg hover:bg-distributor-400  hover:-translate-y-1`}
      >
        <h1 className="self-center">Distributor</h1>
      </Button>
      <Button
        to="organizer"
        className={`my-2 mx-4  bg-organizer-400 shadow-xl hover:shadow-lg hover:bg-organizer-400  hover:-translate-y-1`}
      >
        <h1 className="self-center">Organizer</h1>
      </Button>
      <Button
        to="transporter"
        className={`my-2 mx-4  bg-transporter-400 shadow-xl hover:shadow-lg hover:bg-transporter-400  hover:-translate-y-1`}
      >
        <h1 className="self-center">Transporter</h1>
      </Button>
      <Button
        to="vendor"
        className={`my-2 mx-4 bg-vendor-400 shadow-xl hover:shadow-lg hover:bg-vendor-400  hover:-translate-y-1`}
      >
        <h1 className="self-center">Vendor</h1>
      </Button>
      <Button
        to="warehouse"
        className={`mb-4 mt-2 mx-4 bg-warehouse-400 shadow-xl hover:shadow-lg hover:bg-warehouse-400  hover:-translate-y-1`}
      >
        <h1 className="self-center">Warehouse</h1>
      </Button>
    </main>
  );
}

Start.propTypes = {};
