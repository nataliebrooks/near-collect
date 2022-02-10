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
    <Link to="/" className="flex flex-1 flex-col h-screen">

      <h1>Thank you!</h1>
      <h1>Your request has been recorded.</h1>
      <h1>Please check back to see if anyone has placed an order for your things.</h1>
    </Link>
  );
}

Submit.propTypes = {};
