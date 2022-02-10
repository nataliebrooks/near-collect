import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as nearAPI from "near-api-js";

export default function Submit({ contract, currentUser }) {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  let image = "https://picsum.photos/332/720";
  let answer = "Two hats, an iphone charger, a water bottle";
  if (location && location.state) {
    image = location.state.image;
    answer = location.state.answer;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    // Need to upload image  to IPFS and pass URL
    // https://blog.logrocket.com/decentralized-data-storage-using-ipfs-and-react-a-tutorial-with-examples/#how-to-build-a-frontend-dapp-with-ipfs-and-react

    // const item = await contract.nft_mint(
    //   {
    //     token_id: `${currentUser.account}` + Date.now(),
    //     receiver_id: currentUser.accountId,
    //     metadata: {
    //       title: "Test",
    //       description: answer,
    //       media: "nothin",
    //       copies: 1,
    //     },
    //   },
    //   "200000000000000",
    //   nearAPI.utils.format.parseNearAmount("0.1")
    // ); // This needs to redirect
  };

  return (
      <main className="flex flex-col justify-between h-full w-full">
        <div className="flex flex-1 flex-col justify-start pt-32 pb-16 pl-16 pr-4">
          <h1 className="text-5xl font-bold text-green-600">thanks!</h1>
          <h6 className="text-xl">your pile has been created.</h6>
          <br />
          <p>
            A Distributor will be able to see your new pile and create an order
            for your things.
          </p>
        </div>
        <div className="flex justify-end items-center">
          <div className="flex flex-col pt-32 pr-8">
            <Link
              to="/"
              className="bg-transparent shadow-lg hover:shadow-sm  hover:bg-black  hover:text-green-500 py-2 px-4 border-2 border-black hover:border-transparent"
            >
              continue
            </Link>
          </div>
        </div>
      </main>
  );
}

Submit.propTypes = {};
