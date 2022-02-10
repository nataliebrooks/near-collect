import React, { useState } from "react";
import PropTypes from "prop-types";
import List from "../../components/common/List";

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
          media: "https://picsum.photos/332/720",
          description: "some shoes, a hat, pens",
          signerId: `user #${i}`,
        };
        newArray = [...newArray, newItem];
      }

      resolve({ hasNextPage: true, data: newArray });
    }, RESPONSE_TIME_IN_MS);
  });
}

const updateItem = () => {};

const Item = ({ item }) => {
  const [answer, setAnswer] = useState("");
  return (
    <>
      <div className="flex flex-1 flex-col justify-between m-2 shadow-lg rounded-lg">
        <div className="flex justify-center flex-1 overflow-hidden">
          <img
            className="w-full h-full bg-cover object-cover object-center rounded-t-lg"
            src={item.media}
          />
        </div>
        <div className="flex flex-col justify-between p-4">
          <textarea
            className="w-full px-4 py-2 text-gray-700 border-2 focus:outline-none"
            rows="4"
            placeholder="Label the item(s) in the image with a comma separate list, i.e two, white, iphone charger"
            value={answer}
            onChange={({ target }) => setAnswer(target.value)}
          />
          <div className="flex justify-end mt-2">
            <button onClick={updateItem} className="flex-1 bg-transparent shadow-sm hover:shadow hover:bg-black  hover:text-green-500 py-2 px-4 border-2 border-black hover:border-transparent">submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

const renderListItem = (item) => {
  return <Item item={item} />;
};

export default function OrganizerApp() {
  return (
    <main className="flex flex-col justify-start h-full w-full">
      <div className="flex flex-1 flex-col justify-start pt-32 pb-16 pl-16 pr-4">
        <h1 className="text-5xl font-bold text-green-600">organize</h1>
        <h6 className="text-xl">for the common good.</h6>
        <br />
        <p>
          After the Producer gives a "pile" to a Distributor, the Distributor
          will begin taking pictures of each item in the pile. Organizers can
          scroll through these pictures and label the items.
        </p>
      </div>

      <div className="flex flex-1 justify-center items-center">
        <List loadData={loadItems} renderListItem={renderListItem} />
      </div>
    </main>
  );
}

OrganizerApp.propTypes = {};
