import getConfig from '../config';
import * as nearAPI from 'near-api-js';

export const {
	GAS,
	networkId, nodeUrl, walletUrl, nameSuffix,
	contractName, contractMethods,
	accessKeyMethods,
    marketId, marketDeposit,
} = getConfig(process.env.NEAR_ENV || "testnet");

const {
	Account,
	Contract,
	InMemorySigner,
} = nearAPI;

let near

export function getContract(account, methods = contractMethods) {
	return new Contract(account, contractName, { ...methods });
}

export const getWallet = async () => {
	near = await nearAPI.connect({
		networkId, nodeUrl, walletUrl, deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() },
	});
	const wallet = new nearAPI.WalletAccount(near);
	const contractAccount = new Account(near.connection, contractName);
	return { near, wallet, contractAccount };
};

export const createGuestAccount = (near, key) => {
	key.toString = () => key.secretKey;
	near.connection.signer.keyStore.setKey(networkId, 'guests.' + contractName, key);
	const account = new Account(near.connection, 'guests.' + contractName);
	return account;
};