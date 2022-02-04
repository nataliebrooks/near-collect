import React from "react";
import styled from "styled-components";
import List from "./common/List";

const PER_PAGE_LIMIT = 10;
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
          media: "https://picsum.photos/200",
          status: "IN TRANSIT"
        };
        newArray = [...newArray, newItem];
      }

      resolve({ hasNextPage: true, data: newArray });
    }, RESPONSE_TIME_IN_MS);
  });
}

const Order = ({ order }) => {
  return (
    <>
      <div className="flex p-2">
        {/* item itself, should have a link */}
        <div className="shadow-lg hover:shadow hover:-translateY-sm flex flex-1 rounded-lg overflow-hidden">
          <img className="h-32 w-full shadow-inner bg-cover" src={order.media} />
          <div className="flex flex-1 flex-col justify-center p-4 bg-white">
            <p className="leading-normal text-sm truncate">
              {order.status}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const renderListItem = (it) => {
  return <Order order={it} />;
};

const OrderList = () => {

  // async function loadOrders(startCursor = 0) {
  //   return await wallet.account().viewFunction(
  //     "order-book.frontier.test.near", // enum this
  //     "get_orders_by_assignee", // enum this?
  //     { assignee_id: currentUser.accountId, from_index: startCursor, limit: PER_PAGE_LIMIT } // page limit tracks table
  //   ).resolve({ hasNextPage: true, data: res });
  //   // return new Promise((resolve) => {
  //   //   let newArray = [];
  
  //   //   // Load data
  //   //   setTimeout(() => {
  //   //     for (let i = startCursor; i < startCursor + ARRAY_SIZE; i++) {
  //   //       const newItem = {
  //   //         key: i,
  //   //         media: 'https://picsum.photos/200',
  //   //         description: 'some shoes, a hat, pens',
  //   //         signerId: `user #${i}`,
  //   //       };
  //   //       newArray = [...newArray, newItem];
  //   //     }
  
  //   //     resolve({ hasNextPage: true, data: newArray });
  //   //   }, RESPONSE_TIME_IN_MS);
  //   // });
  // }



  return (
    <>
      <div className="mt-6 pt-4 rounded-t-2xl bg-producer-200">
        <h1 className="text-xl font-semibold pl-4 text-white">Orders</h1>
        <List loadData={loadItems} renderListItem={renderListItem} />
      </div>
    </>
  );
};

export default OrderList;

// May want to move this out, into Items route as data will change depending on role
// const NEW_ITEMS_QUERY = gql`
//   query {
//     items(first: 5, where: { status: NEW }) {
//       id
//       signerId
//       status
//       category
//       labels
//     }
//   }
// `;
