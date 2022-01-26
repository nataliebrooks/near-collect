import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Big from "big.js";
import CreateItem from "./components/CreateItem";
import DeleteItem from "./components/DeleteItem";
import GetItem from "./components/GetItem";
import ItemTable from "./components/ItemTable";
import SignIn from "./components/SignIn";

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const signIn = () => {
    wallet.requestSignIn(
      { contractId: nearConfig.contractName, methodNames: [contract.nft_mint.name, contract.new_default_meta.name] }, //contract requesting access
      "NEAR frontier", //optional name
      null, //optional URL to redirect to if the sign in was successful
      null //optional URL to redirect to if the sign in was NOT successful
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <main>
      {/* Nav Bar Start */}
      <header>
        <div className="sticky top-0 z-40 w-full flex-none bg-transparent">
            <div className="py-4 border-b border-slate-300/10 mx-8">
              <div className="relative flex items-center">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-200">
                    NEAR frontier
                  </h1>
                  <h2 className="text-xl">common-good</h2>
                </div>
                <div className="ml-auto -my-1 flex items-center justify-center hover:text-slate-600">
                  {currentUser ? (
                    <button onClick={signOut}>Log out</button>
                  ) : (
                    <button onClick={signIn}>Log in</button>
                  )}
                </div>
              </div>
          </div>
        </div>
      </header>
      {/* Nav Bar End */}
      <div className="h-screen">
        <div className="max-w-6xl mx-auto pt-10">
        {currentUser ? (
        <>
          <CreateItem contract={contract} currentUser={currentUser} />
          {/* <GetItem contract={contract} /> */}
          <br/>
          <ItemTable contract={contract} />
        </>
      ) : (
        <SignIn />
      )}
        </div>
      </div>
      
    </main>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    nft_mint: PropTypes.func.isRequired,
    new_default_meta: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
