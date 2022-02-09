import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as nearAPI from "near-api-js";
import { generateSeedPhrase, parseSeedPhrase } from "near-seed-phrase";

import { get, set } from "../utils/storage";
import { createGuestAccount } from "../utils/near";
import getConfig from "../config.js";

const LOCAL_KEYS = "__LOCAL_KEYS";

const { Account, KeyPair } = nearAPI;

export const SignIn = ({ near, contract }) => {
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [keys, setKeys] = useState({});

  const loadKeys = () => {
    const {
      seedPhrase,
      accessAccountId,
      accessPublic,
      accessSecret,
      signedIn,
    } = get(LOCAL_KEYS);
    if (!accessAccountId) return;
    const { secretKey } = parseSeedPhrase(seedPhrase);
    setKeys({
      seedPhrase,
      accessAccountId,
      accessPublic,
      accessSecret: secretKey,
      signedIn,
    });
  };

  const signIn = () => {
    // if (wallet === undefined)
    //   alert("Problem connecting to NEAR. Do you have Javascript installed?");
    // wallet.requestSignIn(
    //   {
    //     contractId: contract,
    //     methodNames: [contract.get_orders_by_requester.name],
    //   }, //contract requesting access
    //   "Collect", //optional name
    //   null,
    //   null
    // );
  };

  const continueAsGuest = async () => {
    // Check username is populated
    // TODO: replace with client side validation, disable button
    if (username === "") {
      return alert("Please enter a username");
    }

    // Check username is available

    const { seedPhrase, publicKey, secretKey } = generateSeedPhrase();
    const guestAccount = createGuestAccount(near, KeyPair.fromString(secretKey));
    const account_id = username + "." + contract.contractId;
    const contractAccount = new Account(near.connection, contract);
    try {
      await contractAccount.viewFunction(contract, "get_account", {
        account_id,
      });
      return alert("username taken");
    } catch (e) {
      console.warn(e);
    }
    setLoading(true);
    
    try {
      await contractAccount.functionCall("create_guest", {
        account_id,
        public_key: publicKey.toString(),
      });
    } catch (e) {
      setLoading(false);
      return alert("Error creating guest account");
    }
    const keys = {
      seedPhrase,
      accessAccountId: account_id,
      accessPublic: publicKey.toString(),
      accessSecret: secretKey,
      signedIn: true,
    };
    set(LOCAL_KEYS, keys);
    setKeys(keys);
    setLoading(false);
    return null;
  };

  useEffect(() => {
    if (keys === {}) loadKeys();
    // if (wallet === undefined) return;
    // else if (wallet.isSignedIn()) setConnected(true);
    // // navigate
    // else if (keys && keys.signedIn) setConnected(true);
  }, []);

  return (
    <>
      <main className="flex flex-col justify-end h-screen w-full bg-white text-black">
        <div className="flex flex-col justify-end h-1/2 pl-16">
          <svg
            height="10"
            viewBox="0 0 76 20"
            width="45.6"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path d="m38.0449 4.17778v11.66662c0 .0889-.0666.1778-.1777.1778h-1.2223c-.5555 0-1.0888-.2889-1.4-.7555l-5.5111-8.51114.1778 4.24444v4.8667c0 .0889-.0667.1777-.1778.1777h-1.6c-.0889 0-.1777-.0666-.1777-.1777v-11.68892c0-.08889.0666-.17778.1777-.17778h1.2c.5556 0 1.0889.28889 1.4.75556l5.5111 8.48884-.1777-4.2444v-4.82222c0-.08889.0666-.17778.1777-.17778h1.6c.1334 0 .2.06667.2.17778z"></path>
            <path d="m54.444 16h-1.6889c-.1111 0-.2-.1111-.1555-.2222l4.4889-11.62224c.0444-.08889.1333-.15556.2222-.15556h2.1333c.1111 0 .2.06667.2223.15556l4.5111 11.62224c.0444.1111-.0445.2222-.1556.2222h-1.6889c-.0666 0-.1333-.0444-.1555-.1111l-3.6223-9.55557c-.0444-.13333-.2666-.13333-.3111 0l-3.6222 9.55557c-.0444.0667-.1111.1111-.1778.1111z"></path>
            <path d="m75.9557 15.7333-3.3778-4.3111c1.9111-.3555 3.0222-1.64442 3.0222-3.6222 0-2.26667-1.4667-3.8-4.0889-3.8h-4.7111c-.1333 0-.2444.11111-.2444.24444 0 .88889.7111 1.6 1.6 1.6h3.1777c1.5778 0 2.3334.8 2.3334 1.97778s-.7334 1.97778-2.3334 1.97778h-4.4889c-.1333 0-.2444.11111-.2444.2444v5.7778c0 .0889.0667.1778.1778.1778h1.6c.0889 0 .1778-.0667.1778-.1778v-4.2889h1.8444l2.9333 3.8223c.3111.4222.8.6444 1.3334.6444h1.2222c.0889 0 .1555-.1556.0667-.2667z"></path>
            <path d="m49.3776 4h-7.4444c-.1334 0-.2223.08889-.2223.22222 0 .88889.7334 1.62222 1.6223 1.62222h6.0444c.0889 0 .1778-.06666.1778-.17777v-1.51111c-.0222-.08889-.0889-.15556-.1778-.15556zm0 10.1556h-5.5555c-.0889 0-.1778-.0667-.1778-.1778v-3c0-.0889.0666-.1778.1778-.1778h5.1333c.0889 0 .1778-.0667.1778-.1778v-1.51109c0-.08889-.0667-.17778-.1778-.17778h-7c-.1333 0-.2445.11111-.2445.24445v6.55552c0 .1334.1112.2445.2445.2445h7.4222c.0889 0 .1778-.0667.1778-.1778v-1.5111c-.0222-.0667-.0889-.1333-.1778-.1333z"></path>
            <path d="m16.0444 1.02222-4.1777 6.2c-.2889.42222.2666.93334.6666.57778l4.1111-3.57778c.1112-.08889.2667-.02222.2667.13334v11.17774c0 .1556-.2.2223-.2889.1111l-12.44442-14.888844c-.4-.488889-.97778-.755556-1.62222-.755556h-.44445c-1.155554 0-2.11111.955556-2.11111 2.13333v15.73337c0 1.1777.955556 2.1333 2.13333 2.1333.73334 0 1.42223-.3778 1.82223-1.0222l4.17777-6.2c.28889-.4222-.26666-.9334-.66666-.5778l-4.11111 3.5556c-.11112.0888-.26667.0222-.26667-.1334v-11.15553c0-.15556.2-.22223.28889-.11111l12.44442 14.88884c.4.4889 1 .7556 1.6222.7556h.4445c1.1778 0 2.1333-.9556 2.1333-2.1333v-15.73337c-.0222-1.177774-.9778-2.13333-2.1555-2.13333-.7334 0-1.4223.377778-1.8223 1.02222z"></path>
          </svg>
          <h1 className="text-5xl font-bold text-green-600">collect</h1>
          <h6 className="text-xl">for the common good.</h6>
        </div>
        <div className="flex justify-end items-center h-1/2">
          <div className="flex flex-col pr-8">
            <div className="mb-2">
              <button
                onClick={signIn}
                className="text-left bg-transparent hover:bg-green-500 py-2 px-4 border-2 border-green-500 hover:border-transparent"
              >
                Log in.
              </button>
            </div>
            <div
              onClick={continueAsGuest}
              className="bg-transparent hover:bg-black  hover:text-green-500 py-2 px-4 border-2 border-black hover:border-transparent rounded"
            >
              Continue as guest.
            </div>
            <input
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
      </main>
    </>
  );
};

SignIn.propTypes = {
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }),
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
  }),
};
