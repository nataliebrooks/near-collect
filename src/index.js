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
import NotFound from "./routes/NotFound";
import SignIn from "./routes/SignIn";
import Start from "./routes/Start";
// producer
import ProducerApp from "./routes/producer/ProducerApp";
import ProducerDashboard from "./routes/producer/ProducerDashboard";
import Items from "./routes/producer/Items";
import Orders from "./routes/producer/Orders";
// distributor
import DistributorApp from "./routes/distributor/DistributorApp";
import DistributorDashboard from "./routes/distributor/DistributorDashboard";
import Items from "./routes/distributor/Items";
import Orders from "./routes/distributor/Orders";
// organizer
import OrganizerApp from "./routes/organizer/OrganizerApp";
// transporter
import TransporterApp from "./routes/transporter/TransporterApp";
import TransporterDashboard from "./routes/transporter/TransporterDashboard";
// vendor
import VendorApp from "./routes/vendorVendorApp";
import VendorDashboard from "./routes/vendorVendorDashboard";
import Ideas from "./routes/vendor/Ideas";
// storage
import StorageApp from "./routes/storage/StorageApp";
import StorageDashboard from "./routes/storage/StorageDashboard";
import Items from "./routes/storage/Items";
// camera
import Camera from "./routes/Camera";
import Question from "./routes/Question";
import Submit from "./routes/Submit";

// Config
import getConfig from "./config.js";

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
      viewMethods: [""],
      // Change methods can modify the state, but you don't receive the returned value when called
      changeMethods: ["nft_mint"],
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
                <SignIn
                  contract={contract}
                  nearConfig={nearConfig}
                  wallet={walletConnection}
                />
              }
            />
            <Route
              path="/"
              element={
                // <RequireAuth currentUser={currentUser}>
                  <App currentUser={currentUser} wallet={walletConnection} />
                // </RequireAuth>
              }
            >
              <Route index element={<Start />} />
              <Route path="producer" element={<ProducerApp />}>
                <Route index element={<ProducerDashboard />} />
                <Route path="piles" element={<Items />} />
                <Route path="orders" element={<Orders />} />
              </Route>
              <Route path="distributor" element={<DistributorApp />}>
                <Route index element={<DistributorDashboard />} />
                <Route path="piles" element={<Items />} />
                <Route path="orders" element={<Orders />} />
              </Route>
              <Route path="organizer" element={<OrganizerApp />} />
              <Route path="transporter" element={<TransporterApp />}>
                <Route index element={<TransporterDashboard />} />
                <Route path="orders" element={<Orders />} />
              </Route>
              <Route path="vendor" element={<VendorApp />} >
              <Route index element={<VendorDashboard />} />
                <Route path="ideas" element={<Ideas />} />
                </Route>
              <Route path="storage" element={<StorageApp />}>
                <Route index element={<StorageDashboard />} />
                <Route path="items" element={<Items />} />
              </Route>
              <Route path="camera" element={<Camera />} />
              <Route path="question" element={<Question />} />
              <Route path="submit" element={<Submit />} />
              <Route path="*" element={<NotFound />} />
            </Route>
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
