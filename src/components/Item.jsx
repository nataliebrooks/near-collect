import React from 'react';
import { useState } from "react";

export function Item({ contract, id, name, labelled, sender }) {
  const [checked, setChecked] = useState(labelled);
  
  const complete = ({ target }) => {
    setChecked(target.checked);
    contract.update({ id, updates: { name, labelled: target.checked } });
  };

  const del = () => {
    // on clicking the delete button invoke the del method on
    // the smart contract
    contract.del({ id });
  };

  return (
    <>
      <p>
        <input type="checkbox" checked={checked} onChange={complete} />
        {name}
      </p>
      <button onClick={del}>delete</button>
    </>
  );
}