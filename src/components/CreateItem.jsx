import React from "react";
import { useState } from "react";
import * as nearAPI from 'near-api-js';
// import Big from 'big.js';

// const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const CreateItem = ({ contract, currentUser }) => {
  const [title, setTitle] = useState("");
  const [media, setMedia] = useState("");
  const [count, setCount] = useState("100");
  const [loading, setLoading] = useState(false);

  const incrementCounter = () => setCount(count + 1);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    // invoke the smart contract's create method
    const item = await contract.nft_mint(
      {
        "token_id": "100",
        "receiver_id": currentUser.accountId,
        "token_metadata": { "title": title, "description": "init tests", "media": media, "copies": 1}
      },
      "200000000000000",
      nearAPI.utils.format.parseNearAmount("0.1")
    );
    incrementCounter();
    setTitle("");
    setLoading(false);

    // print the item to the console
    console.log("my item", title);
  };
  return (
    <>
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit}>
          <div className="relative flex items-center ">
            <input
              className="appearance-none block bg-slate-200 text-slate-700 pxborder rounded leading-tight focus:outline-none focus:bg-white"
              id="create_item"
              type="text"
              placeholder="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
            <input
              className="appearance-none block bg-slate-200 text-slate-700 pxborder rounded leading-tight focus:outline-none focus:bg-white"
              id="create_item"
              type="text"
              placeholder="media"
              value={media}
              onChange={({ target }) => setMedia(target.value)}
            />
          </div>
          <button
              className="bg-green-500 hover:bg-green-700 px-5 py-2 leading-tight rounded text-white"
              disabled={loading}
            >
              Create
            </button>
        </form>
      </div>
    </>
  );
};

export default CreateItem;

// CreateItem.propTypes = {
//   contract: PropTypes.shape({
//     // create: PropTypes.func.isRequired,
//     // get: PropTypes.func.isRequired,
//     // getById: PropTypes.func.isRequired,
//     // update: PropTypes.func.isRequired,
//     // del: PropTypes.func.isRequired,
//   }).isRequired,
//   currentUser: PropTypes.shape({
//     accountId: PropTypes.string.isRequired,
//     balance: PropTypes.string.isRequired,
//   }),
//   nearConfig: PropTypes.shape({
//     contractTitle: PropTypes.string.isRequired,
//   }).isRequired,
//   wallet: PropTypes.shape({
//     requestSignIn: PropTypes.func.isRequired,
//     signOut: PropTypes.func.isRequired,
//   }).isRequired,
// };
