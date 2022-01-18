import React from "react";
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
    console.log("my item", name);
  };
  return (
    <>
      <div class="w-full max-w-xs">
        <form 
        onSubmit={handleSubmit}>
          <div class="relative flex items-center ">
            <input
              class="appearance-none block bg-slate-200 text-slate-700 pxborder rounded leading-tight focus:outline-none focus:bg-white"
              id="create_item"
              type="text"
              placeholder="name"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
            <button class="bg-green-500 hover:bg-green-700 px-5 py-2 leading-tight rounded text-white" disabled={loading}>Create</button>
          </div>
          
        </form>
      </div>
    </>
  );
};

export default CreateItem;
