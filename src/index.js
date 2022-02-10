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
import Start from "./routes/Start";
import ProducerApp from "./routes/ProducerApp";
import DistributorApp from "./routes/DistributorApp";
import OrganizerApp from "./routes/OrganizerApp";
import TransporterApp from "./routes/TransporterApp";
import VendorApp from "./routes/VendorApp";
import WarehouseApp from "./routes/WarehouseApp";
import Camera from "./routes/Camera";
import Question from "./routes/Question";
import Submit from "./routes/Submit";
import Items from "./routes/Items";
import Orders from "./routes/Orders";
import NotFound from "./routes/NotFound";

// Config
import getConfig from "./config.js";
import * as Role from "./utils/roles";
import DistributorDashboard from "./routes/DistributorDashboard";
import ProducerDashboard from "./routes/ProducerDashboard";

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
                <RequireAuth currentUser={currentUser}>
                  <App currentUser={currentUser} wallet={walletConnection} />
                </RequireAuth>
              }
            >
              <Route index element={<Start />} />
              <Route path="producer" element={<ProducerApp />}>
                <Route index element={<ProducerDashboard />} />
                <Route path="items" element={<Items />} />
                <Route path="orders" element={<Orders />} />
              </Route>
              <Route path="distributor" element={<DistributorApp />}>
                <Route index element={<DistributorDashboard />} />
                <Route path="items" element={<Items />} />
                <Route path="orders" element={<Orders />} />
              </Route>
              <Route path="organizer" element={<OrganizerApp />} />
              <Route path="transporter" element={<TransporterApp />} />
              <Route path="vendor" element={<VendorApp />} />
              <Route path="warehouse" element={<WarehouseApp />} />
              <Route path="camera" element={<Camera />} />
              <Route path="question" element={<Question />} />
              <Route path="submit" element={<Submit />} />
              <Route path="items" element={<Items />} />
              <Route path="orders" element={<Orders />} />
              {/* <Route path="item" element={<Item />} />
              <Route path="order" element={<Order />} />
              <Route path="table" element={<Table />} /> */}
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
