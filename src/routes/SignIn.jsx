import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function SignIn({ contract, nearConfig, wallet }) {
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const signIn = () => {
    wallet
      .requestSignIn(
        {
          contractId: nearConfig.contractName,
          methodNames: [contract.get_orders_by_requester.name],
        }, //contract requesting access
        "NEAR frontier", //optional name
        null, //optional URL to redirect to if the sign in was successful
        null //optional URL to redirect to if the sign in was NOT successful
      )
      .then(() => navigate(from, { replace: true })); // Or maybe I use the above...
  };

  return (
    <>
      <main className="flex flex-col justify-end h-screen w-full bg-white text-black">
        <div className="flex flex-col justify-end h-1/2 pl-16">
          <h1 className="text-4xl font-bold text-green-600">collect</h1>
          <h6 className="text-lg">for the common good.</h6>
        </div>
        <div className="flex justify-end items-center h-1/2">
          <div className="flex flex-col pr-8">
            <div className="mb-2">
              <button
                onClick={signIn}
                className="text-left bg-transparent hover:bg-green-500 text-black hover:text-black py-2 px-4 border border-green-500 hover:border-transparent"
              >
                Log in.
              </button>
            </div>

            <button
              onClick={signIn}
              className="bg-transparent hover:bg-black text-black hover:text-green-500 py-2 px-4 border border-black hover:border-transparent rounded"
            >
              Continue as guest.
            </button>
          </div>
        </div>
      </main>
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
    requestSignIn: PropTypes.func.isRequired,
  }).isRequired,
};
