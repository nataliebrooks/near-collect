import React from "react";
import PropTypes from "prop-types";
import OrderTable from "../components/OrderTable";


export default function Orders({ contract, wallet, currentUser }) {
  return (
    <main className="flex flex-col h-screen w-full p-8">
      <OrderTable contract={contract} wallet={wallet} currentUser={currentUser} />
    </main>
  );
}

Orders.propTypes = {};
