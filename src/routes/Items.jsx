import React from "react";
import PropTypes from "prop-types";
import ItemTable from "../components/ItemTable";

export default function Items({ contract, wallet, currentUser }) {
  return (
    <main className="flex flex-col h-screen w-full">
      <ItemTable contract={contract} wallet={wallet} currentUser={currentUser} />
    </main>
  );
}

Items.propTypes = {};
