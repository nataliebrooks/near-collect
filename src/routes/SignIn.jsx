import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function SignIn({ contract, nearConfig, wallet }) {
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const signIn = () => {
    wallet.requestSignIn(
      {
        contractId: nearConfig.contractName,
        methodNames: [contract.get_orders_by_requester.name],
      }, //contract requesting access
      "NEAR frontier", //optional name
      null, //optional URL to redirect to if the sign in was successful
      null //optional URL to redirect to if the sign in was NOT successful
    ).then(() => navigate(from, { replace: true })); // Or maybe I use the above...
  };

  return (
    <>
      <p>
        This app demonstrates a key element of NEAR’s UX: once an app has
        permission to make calls on behalf of a user (that is, once a user signs
        in), the app can make calls to the blockchain for them without prompting
        extra confirmation. So you’ll see that if you don’t include a donation,
        your message gets posted right to the guest book.
      </p>
      <p>
        But if you do add a donation, then NEAR will double-check that you’re ok
        with sending money to this app.
      </p>
      <p>Go ahead and sign in to try it out!</p>
      <button onClick={signIn}>Log in</button>
    </>
  );
}

SignIn.propTypes = {
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired
  }).isRequired
};
