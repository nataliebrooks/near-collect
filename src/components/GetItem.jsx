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
    <div className="w-full max-w-xs">
      <form 
      onSubmit={handleSubmit}>
        <div className="relative flex items-center ">
          <input
            className="appearance-none block bg-slate-200 text-slate-700 pxborder rounded leading-tight focus:outline-none focus:bg-white"
            id="get_item"
            type="text"
            placeholder="id"
            value={name}
            onChange={({ target }) => setId(target.value)}
          />
          <button className="bg-green-500 hover:bg-green-700 px-5 py-2 leading-tight rounded text-white" disabled={loading}>Get By Id</button>
        </div>
        
      </form>
    </div>
  </>
  );
}

export default GetItem;