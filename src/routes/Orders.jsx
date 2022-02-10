import React from "react";
import PropTypes from "prop-types";
import OrderList from "../components/OrderList";


export default function Orders({ wallet, currentUser }) {
  return (
    <main className="flex flex-col h-screen w-full">
      <OrderList wallet={wallet} currentUser={currentUser} />
    </main>
  );
}

Orders.propTypes = {};