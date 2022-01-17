import React from 'react';
import { useState } from "react";

const GetItem = ({ contract }) => {
  const [id, setId] = useState("");
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    // invoke the smart contract's create method
    const item = await contract.getById( { id: parseInt(id) });
    setItem(item);
    setId("");
    setLoading(false);
  };
  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="{{ id }}"
        value={id}
        onChange={({ target }) => setId(target.value)}
      />
      <button disabled={loading}>Get Item</button>
    </form>
    <p> {!!item && item.name} </p> 
    </>
  );
}

export default GetItem;