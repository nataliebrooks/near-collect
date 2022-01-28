import React from "react";
import PropTypes from "prop-types";
import ItemTable from "../components/ItemTable";

export default function Items({ contract }) {
  return (
    <main className="flex flex-col h-screen w-full p-8">
      <ItemTable contract={contract} />
    </main>
  );
}

Items.propTypes = {};
