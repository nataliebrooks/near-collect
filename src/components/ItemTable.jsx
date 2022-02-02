import { gql, useQuery } from "@apollo/client";
import { utils } from "near-api-js";
import React, { useMemo, useState } from "react";
import { isSetAccessorDeclaration } from "typescript";
import { classNames } from "./shared/Utils";
import Table, { SelectColumnFilter } from "./Table";

const PER_PAGE_LIMIT = 10;

function StatusPill({ value }) {
  const status = value ? value : "todo";

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status.startsWith("NEW") ? "bg-green-100 text-green-800" : null,
        status.startsWith("needs label") ? "bg-red-100 text-red-800" : null
      )}
    >
      {status}
    </span>
  );
}

export function AvatarCell({ value }) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <img className="h-10 w-10 rounded-full" src={value} alt="" />
      </div>
    </div>
  );
}

// This can be moved to Shared Button
export 

const ItemTable = ({ contract, wallet, currentUser }) => {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState(null);
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(NEW_ITEMS_QUERY);

  async function createOrder(itemId, signerId) {
    const order = await wallet.account().functionCall({
      contractId: 'order-book.frontier.test.near',
      methodName: 'create_order',
      args: {
        requester_id: currentUser.accountId,
        owner_id: signerId,
        token_id: itemId,
      },
      gas: "300000000000000",
      attachedDeposit: "1"
    });
  }

  const CreateOrderButton = ({ value, column, row }) => {
    const itemId = row.original.id
    const signerId = row.original.signerId
    return (
      <div className="flex items-center">
        {/* <div className="flex-shrink-0 h-10 w-10">
          <img className="h-10 w-10 rounded-full" src={row.original[column.imgAccessor]} alt="" />
        </div> */}
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => createOrder(itemId, signerId)}>
              Order
            </button>
          </div>
        </div>
      </div>
    );
  }
  

  const columns = useMemo(
    () => [
      {
        Header: "Image",
        accessor: "media",
        Cell: AvatarCell,
      },
      {
        Header: "Creator",
        accessor: "signerId",
      },
      {
        Header: "Update",
        Cell: CreateOrderButton,
      },
    ],
    []
  );

  // should remove items that order already exists for
  return (
    <>
      <h1 className="text-xl font-semibold">Items</h1>
      <div className="mt-4">
        <Table columns={columns} data={(data && data.items) || []} />
        { order ? <h1>{order}</h1> : null}
      </div>
    </>
  );
};

export default ItemTable;

// May want to move this out, into Items route as data will change depending on role
const NEW_ITEMS_QUERY = gql`
  query {
    items(first: 5, where: { status: NEW }) {
      id
      signerId
      status
      category
      labels
    }
  }
`;
