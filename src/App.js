import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Big from "big.js";
import CreateItem from "./components/CreateItem";
import DeleteItem from "./components/DeleteItem";
import GetItem from "./components/GetItem";
import ItemList from "./components/ItemList";
import SignIn from "./components/SignIn";

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const signIn = () => {
    wallet.requestSignIn(
      { contractId: nearConfig.contractName }, //contract requesting access
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
    <main class="max-w-8xl mx-auto bg-slate-900 text-slate-400">
      {/* Nav Bar Start */}
      <header>
        <div class="sticky top-0 z-40 w-full flex-none bg-transparent">
          <div class="max-w-8xl mx-auto">
            <div class="py-4 border-b border-slate-300/10 mx-8">
              <div class="relative flex items-center">
                <div>
                  <h1 class="text-2xl font-extrabold text-slate-200">
                    NEAR frontier
                  </h1>
                  <h2 class="text-xl">common-good</h2>
                </div>
                <div class="ml-auto -my-1 flex items-center justify-center hover:text-slate-600">
                  {currentUser ? (
                    <button onClick={signOut}>Log out</button>
                  ) : (
                    <button onClick={signIn}>Log in</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Nav Bar End */}
      <div>
        <div class="max-w-4xl mx-auto pt-10">
        {currentUser ? (
        <>
          <CreateItem contract={contract} />
          <GetItem contract={contract} />
          <ItemList contract={contract} />
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
    create: PropTypes.func.isRequired,
    get: PropTypes.func.isRequired,
    getById: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
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
