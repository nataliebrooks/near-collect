import React from "react";
import PropTypes from "prop-types";
import { Link, Outlet } from "react-router-dom";
import "regenerator-runtime/runtime";
import * as Role from "./utils/roles";

const App = ({ contract, currentUser, nearConfig, wallet, role }) => {
  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <main className="flex flex-col justify-between h-screen w-full">
      {/* Nav Bar Start */}
      <header>
        <div className="z-40 w-full flex-none bg-transparent">
          <div className="py-4 border-b border-slate-300/10 mx-8">
            <div className="relative flex items-center">
              <div>
                <Link to="/" className="text-2xl font-extrabold text-slate-200">
                  NEAR frontier
                </Link>
                <h2 className="text-xl">{role} App</h2>
              </div>
              <div className="ml-auto -my-1 flex items-center justify-center hover:text-slate-600">
                {currentUser ? (
                  <button onClick={signOut}>Log out</button>
                ) : (
                  <h1>Ummm... you shouldn't be here...</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
      {role === Role.PRODUCER || role === Role.DISTRIBUTOR ? (
        <footer className="h-32 grid content-center">
          <div className="flex justify-between text-center">
            <div className="flex-1 border-r border-slate-300/10">
              <Link
                to="orders"
                className="text-2xl font-extrabold text-slate-200"
              >
                Orders
              </Link>
            </div>
            <div className="flex-1">
              <Link
                to="items"
                className="text-2xl font-extrabold text-slate-200"
              >
                Items
              </Link>
            </div>
          </div>
        </footer>
      ) : null}
    </main>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    // nft_mint: PropTypes.func.isRequired,
    // new_default_meta: PropTypes.func.isRequired,
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
