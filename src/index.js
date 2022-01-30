import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import * as nearAPI from "near-api-js";

// Routes //
import App from "./App";
import Camera from "./routes/Camera";
import Create from "./routes/Create";
import Orders from "./routes/Orders";
import Items from "./routes/Items";
import Question from "./routes/Question";

// Config
import getConfig from "./config.js";

// Initializing contract
async function initContract() {
  // get network configuration values from config.js
  // based on the network ID we pass to getConfig()
  const nearConfig = getConfig(process.env.NEAR_ENV || "testnet");

  // create a keyStore for signing transactions using the user's key
  // which is located in the browser local storage after user logs in
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

  // Initializing connection to the NEAR testnet
  const near = await nearAPI.connect({ keyStore, ...nearConfig });

  // Initialize wallet connection
  const walletConnection = new nearAPI.WalletConnection(near);

  // Load in user's account data
  let currentUser;
  if (walletConnection.getAccountId()) {
    currentUser = {
      // Gets the accountId as a string
      accountId: walletConnection.getAccountId(),
      // Gets the user's token balance
      balance: (await walletConnection.account().state()).amount,
    };
  }

  // Initializing our contract APIs by contract name and configuration
  // MARKET CONTRACT
  const contract = await new nearAPI.Contract(
    // User's accountId as a string
    walletConnection.account(),
    // accountId of the contract we will be loading
    // NOTE: All contracts on NEAR are deployed to an account and
    // accounts can only have one contract deployed to them.
    nearConfig.contractName,
    {
      // View methods are read-only – they don't modify the state, but usually return some value
      viewMethods: ['get_orders_by_requester'],
      // Change methods can modify the state, but you don't receive the returned value when called
      // changeMethods: ["nft_mint", "new_default_meta", "new"],
      // Sender is the account ID to initialize transactions.
      // getAccountId() will return empty string if user is still unauthorized
      sender: walletConnection.getAccountId(),
    }
  );

  return { contract, currentUser, nearConfig, walletConnection };
}

// Initializing client to common-good subgraph
const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/elliotbraem/common-good",
  cache: new InMemoryCache(),
});

window.nearInitPromise = initContract().then(
  ({ contract, currentUser, nearConfig, walletConnection }) => {
    ReactDOM.render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <App
                  contract={contract}
                  currentUser={currentUser}
                  nearConfig={nearConfig}
                  wallet={walletConnection}
                />
              }
            >
              <Route path="" element={<Create contract={contract}/>} />
              <Route path="orders" element={<Orders contract={contract} currentUser={currentUser} />} />
              <Route path="items" element={<Items contract={contract} />} />
            </Route>
            <Route
              path="/camera"
              element={<Camera />}
            />
            <Route
              path="/q1"
              element={<Question question="What color is my underwear?" />}
            />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>,
      document.getElementById("root")
    );
  }
);
