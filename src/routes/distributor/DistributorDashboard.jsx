import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/shared/Button";

export default function DistributorDashboard() {
  return (
    <main className="flex flex-col justify-start h-full w-full">
      <div className="flex flex-1 flex-col justify-start pt-32 pb-16 pl-16 pr-4">
        <h1 className="text-5xl font-bold text-green-600">distribute</h1>
        <h6 className="text-xl">for the common good.</h6>
        <br />
        <p>
          After the Producer creates a "pile", the Distributor can create an
          order for it and agree to sort it. If the order is accepted and the
          pile is received, the Distributor will begin taking pictures of each
          item in the pile. Organizers can then scroll through these pictures
          and label the items.
        </p>
      </div>
      <footer className="flex flex-1 flex-col justify-start pt-16 pb-16 px-4">
        <div className="pl-12 pb-4">
          <p>
            Explore below to view order statuses, or the piles available for
            order.
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
            to="piles"
            className={
              "flex-1 m-2 bg-transparent shadow-lg hover:shadow-sm  hover:bg-black  hover:text-green-500 py-2 px-4 border-2 border-black hover:border-transparent"
            }
          >
            <h6 className="text-xl">piles</h6>
          </Link>
        </div>
      </footer>
    </main>
  );
}

// <main className="flex flex-col h-full text-white">
//       <Button
//         to="items"
//         className={`mx-4 mt-4 mb-2 bg-distributor-300 shadow-xl hover:shadow-lg hover:bg-distributor-400 hover:bg-orange-400 hover:-translate-y-1`}
//       >
//         <h1 className="text-2xl font-extrabold ">Items</h1>
//       </Button>
//       <Button
//         to="orders"
//         className={`mx-4 mt-2 mb-4 bg-distributor-300 shadow-xl hover:shadow-lg hover:bg-distributor-400 hover:bg-orange-400 hover:-translate-y-1`}
//       >
//         <h1 className="text-2xl font-extrabold">Orders</h1>
//       </Button>
//     </main>

DistributorDashboard.propTypes = {};
