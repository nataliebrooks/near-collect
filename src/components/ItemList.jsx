import React from "react";
import styled from "styled-components";
import List from "./common/List";

const PER_PAGE_LIMIT = 10;
const ARRAY_SIZE = 2;
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
          description: "some shoes, a hat, pens",
          signerId: `user #${i}`,
        };
        newArray = [...newArray, newItem];
      }

      resolve({ hasNextPage: true, data: newArray });
    }, RESPONSE_TIME_IN_MS);
  });
}

const Item = ({ item }) => {
  return (
    <>
      <div className="flex flex-col p-2 ">
        {/* item itself, should have a link */}
        <div className="shadow-lg hover:shadow hover:-translateY-sm flex flex-1 flex-col rounded-lg overflow-hidden">
          <img className="h-32 w-full shadow-inner bg-cover" src={item.media} />
          <div className="flex flex-1 flex-col justify-center p-4 border-t bg-white">
            <p className="leading-normal text-sm truncate">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const renderListItem = (item) => {
  return <Item item={item} />;
};

const ItemList = () => {
  return (
    <>
      <div className="mt-6 pt-4 rounded-t-2xl bg-producer-200">
        <h1 className="text-xl font-semibold pl-4 text-white">Items</h1>
        <List loadData={loadItems} renderListItem={renderListItem} />
      </div>
    </>
  );
};

export default ItemList;

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
