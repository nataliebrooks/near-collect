import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import * as nearAPI from "near-api-js";

// Routes //
import App from "./App";
import SignIn from "./routes/SignIn";
import Camera from "./routes/Camera";
import Create from "./routes/Create";
import Orders from "./routes/Orders";
import Items from "./routes/Items";
import Question from "./routes/Question";

// Config
import getConfig from "./config.js";
import * as Role from "./utils/roles";

// Initializing contract
async function initContract() {
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
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount,
    };
  }

  // Initializing our contract APIs by contract name and configuration
  const contract = await new nearAPI.Contract(
    walletConnection.account(),
    nearConfig.contractName,
    {
      // View methods are read-only – they don't modify the state, but usually return some value
      viewMethods: ["get_orders_by_requester"],
      // Change methods can modify the state, but you don't receive the returned value when called
      changeMethods: [],
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
              path="/login"
              element={
                <SignIn nearConfig={nearConfig} wallet={walletConnection} />
              }
            />
            <Route
              path="/producer"
              element={
                <RequireAuth currentUser={currentUser}>
                  <App
                    contract={contract}
                    currentUser={currentUser}
                    nearConfig={nearConfig}
                    wallet={walletConnection}
                    role={Role.PRODUCER}
                  />
                </RequireAuth>
              }
            >
              <Route
                path=""
                element={<Create contract={contract} role={Role.PRODUCER} />}
              />
              <Route
                path="/producer/items"
                element={<Items contract={contract} role={Role.PRODUCER} />}
              />
              <Route
                path="/producer/orders"
                element={<Orders contract={contract} role={Role.PRODUCER} />}
              />
            </Route>
            <Route
              path="/distributor"
              element={
                <RequireAuth currentUser={currentUser}>
                <App
                  contract={contract}
                  currentUser={currentUser}
                  nearConfig={nearConfig}
                  wallet={walletConnection}
                  role={Role.DISTRIBUTOR}
                />
                </RequireAuth>
              }
            >
              <Route
                path=""
                element={<Create contract={contract} role={Role.DISTRIBUTOR} />}
              />
              <Route
                path="/distributor/items"
                element={<Items contract={contract} role={Role.DISTRIBUTOR} />}
              />
              <Route
                path="/distributor/orders"
                element={<Orders contract={contract} role={Role.DISTRIBUTOR} />}
              />
            </Route>
            {/* <Route path="organizer" element={} />
                <Route path="warehouse" element={} />
                <Route path="transport" element={} /> */}
            <Route path="/camera" element={<RequireAuth currentUser={currentUser}><Camera /></RequireAuth>} />
            <Route path="/question" element={<RequireAuth currentUser={currentUser}><Question /></RequireAuth>} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>,
      document.getElementById("root")
    );
  }
);

function RequireAuth({ currentUser, children }) {
  let location = useLocation();

  if (!currentUser) {
    // Redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
}
