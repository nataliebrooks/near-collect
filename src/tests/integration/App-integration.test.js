// these are made available by near-cli/test_environment
// note: do not remove the line below as it is needed for these tests
/* global nearlib, nearConfig */

import 'regenerator-runtime/runtime';

let near;
let contract;
let accountId;

beforeAll(async function() {
  near = await nearlib.connect(nearConfig);
  accountId = nearConfig.contractName;
  contract = await near.loadContract(nearConfig.contractName, {
    viewMethods: ['get', 'getById'],
    changeMethods: ["create", "update", "del"],
    sender: accountId
  });
});

it('create an item and retrieve it', async() => {
  const item = await contract.create({ name: 'rock' });
  const actualItem = await contract.getById({ id: item.id });
  const expectedItem = {
    id: item.id,
    name: 'rock',
    labelled: false,
    creator: accountId
  };
  expect(expectedItem).toEqual(actualItem);
});
