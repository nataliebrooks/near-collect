import React from "react";
import PropTypes from "prop-types";
import List from "../../components/common/List";

const ARRAY_SIZE = 20;
const RESPONSE_TIME_IN_MS = 1000;

function loadItems(startCursor = 0) {
  return new Promise((resolve) => {
    let newArray = [];

    // Load data
    setTimeout(() => {
      for (let i = startCursor; i < startCursor + ARRAY_SIZE; i++) {
        const newItem = {
          key: i,
          orderId: "efiz.testnet.123123454352",
          tokenId: "123123454352",
          status: "NEW",
        };
        newArray = [...newArray, newItem];
      }

      resolve({ hasNextPage: true, data: newArray });
    }, RESPONSE_TIME_IN_MS);
  });
}

const updateOrder = () => {};

const Order = ({ order }) => {
  return (
    <>
      <div className="flex p-2">
        <div className="flex flex-1 h-16 shadow-lg hover:shadow-sm hover:-translateY-0.5 overflow-hidden border-2 border-black">
          <img
            className="w-full h-full bg-cover object-cover object-center"
            src={order.media}
          />
          <div className="flex flex-1 flex-col justify-center p-4 bg-white">
            <p className="leading-normal truncate">{order.status}</p>
          </div>
          {order.status === "IN_TRANSIT" ? (
            <button
              className="flex-1 m-2 bg-transparent shadow-sm hover:shadow hover:bg-black  hover:text-green-500 py-2 px-4 border-2 border-black hover:border-transparent"
              onClick={() => updateOrder(order)}
            >
              submit
            </button>
          ) : (
            <span />
          )}
        </div>
      </div>
    </>
  );
};

const renderListItem = (it) => {
  return <Order order={it} />;
};

export default function Orders() {
  return (
    <main className="flex flex-col justify-start h-full w-full">
      <div className="flex flex-1 flex-col justify-start pt-32 pb-16 pl-16 pr-4">
        <h1 className="text-5xl font-bold text-green-600">orders</h1>
      </div>
      <List loadData={loadItems} renderListItem={renderListItem} />
    </main>
  );
}

Orders.propTypes = {};
