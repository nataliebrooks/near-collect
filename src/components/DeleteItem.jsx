import React from 'react';
import { useState } from "react";

const DeleteItem = ({ contract }) => {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    // invoke the smart contract's create method
    await contract.del({ id: parseInt(id)});
    setId("");
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Example"
        value={id}
        onChange={({ target }) => setId(target.value)}
      />
      <button disabled={loading}>Delete Item</button>
    </form>
  );
}

export default DeleteItem;