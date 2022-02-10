import React from "react";
import PropTypes from "prop-types";
import ItemList from "../components/ItemList";

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
        <ItemList />
      </div>
    </main>
  );
}

OrganizerApp.propTypes = {};
