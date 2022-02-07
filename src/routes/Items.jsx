import React from "react";
import PropTypes from "prop-types";
import ItemList from "../components/ItemList"

export default function Items() {
  return (
    <main className="flex flex-col h-screen w-full">
      <ItemList />
    </main>
  );
}

Items.propTypes = {};
