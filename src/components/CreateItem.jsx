import React from 'react';
import { useState } from "react";

const CreateItem = ({ contract }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    // invoke the smart contract's create method
    const item = await contract.create({ name });
    setName("");
    setLoading(false);

    // print the item to the console
    console.log('my item', name);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Example"
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
      <button disabled={loading}>Create Item</button>
    </form>
  );
}

export default CreateItem;