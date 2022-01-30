# Market Contract

This contract contains the logic to create and manage orders

## Deploying the Contract

Build the contract:
./build.sh

This will compile the contract into a wasm you can find in ./res


Test contract (TODO)

cargo test -- --no-capture


Quick deploy:

cd ..
near dev-deploy --wasmFile ./out/market.wasm

This will print out a dev account contract was deployed to.
Set it to CONTRACT_NAME
source neardev/dev-account.env

Initialize the contract:

near call $CONTRACT_NAME new '{"owner_id": "'$CONTRACT_NAME'"}' --accountId $CONTRACT_NAME




Now fun stuff:

Login to your near testnet account

near login

export ACCOUNT_ID={{WALLET_ID}}

near call $CONTRACT_NAME create_order '{"requester_id": "'$ACCOUNT_ID'", "token_id": "9999"}' --accountId $ACCOUNT_ID --depositYocto 1

near view $CONTRACT_NAME get_supply_orders

near view $CONTRACT_NAME get_supply_by_requester_id '{"requester_id": "'$ACCOUNT_ID'"}'

near view $CONTRACT_NAME get_orders_by_requester '{"requester_id": "'$ACCOUNT_ID'", "limit": 5}'
