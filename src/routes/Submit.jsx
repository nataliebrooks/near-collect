import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import * as nearAPI from "near-api-js";

export default function Submit({ contract, currentUser }) {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  let image, answer;
  if (location && location.state) {
    image = location.state.image;
    answer = location.state.answer;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const item = await contract.nft_mint(
      {
        token_id: "3",
        receiver_id: currentUser.accountId,
        metadata: {
          title: "Test",
          description: answer,
          media: "nothin",
          copies: 1,
        },
      },
      "200000000000000",
      nearAPI.utils.format.parseNearAmount("0.1")
    ); // This needs to redirect

    setAnswer("");
    setLoading(false);
  };

  return (
    <main className="flex flex-1">
      <button onClick={handleSubmit}>Submit</button>
    </main>
  );
}

Submit.propTypes = {};
