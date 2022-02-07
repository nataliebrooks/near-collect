import "regenerator-runtime/runtime";
import React from "react";
import PropTypes from "prop-types";
import { Link, Outlet } from "react-router-dom";


const App = ({ currentUser, wallet }) => {
  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <main className="flex flex-col h-screen w-full">
      <header>
        <div className="z-40 pt-4 mx-8">
            <div className="relative flex items-center text-gray-500">
              <div>
                {/* <h2 className="text-xl">{currentUser.accountId}</h2> */}
              </div>
              <div className="ml-auto -my-1 hover:text-gray-700">
                <button onClick={signOut}>Log out</button>
              </div>
            </div>
        </div>
      </header>
      <Outlet />
    </main>
  );
};

App.propTypes = {
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
