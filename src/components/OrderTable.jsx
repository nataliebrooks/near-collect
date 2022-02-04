import React from "react";
import { useEffect, useState, useMemo } from "react";
import Table, { SelectColumnFilter } from "./Table";
import { classNames } from "./shared/Utils";

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

export function AvatarCell({ value, column, row }) {
  // GET IMAGE
  return (
    <div className="flex items-center">
      {/* <div className="flex-shrink-0 h-10 w-10">
        <img className="h-10 w-10 rounded-full" src={row.original[column.imgAccessor]} alt="" />
      </div> */}
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">
          {/* {row.original[column.idAccessor]} */}
        </div>
      </div>
    </div>
  );
}

const OrderTable = ({ contract, wallet, currentUser, role }) => {
  const [orders, setOrders] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [page, setPage] = useState(1);
  // const { loading, error, data } = useQuery(MY_ORDERS);

  async function doOrderAction(requesterId, tokenId, status) {
    switch (role) {
      case "PRODUCER":
        if (status === "NEW") {
          const instructions = await wallet.account().functionCall({
            contractId: "order-book.frontier.test.near",
            methodName: "accept_order",
            args: {
              requester_id: requesterId,
              token_id: tokenId,
            },
            gas: "300000000000000",
            attachedDeposit: "1",
          });
          setInstructions(instructions);
        } else if (status === "ACCEPTED") {
          await wallet.account().functionCall({
            contractId: "order-book.frontier.test.near",
            methodName: "execute_order",
            args: {
              requester_id: requesterId,
              token_id: tokenId,
            },
            gas: "300000000000000",
            attachedDeposit: "1",
          });
        }
        break;
      case "DISTRIBUTOR":
        await wallet.account().functionCall({
          contractId: "order-book.frontier.test.near",
          methodName: "complete_order",
          args: {
            requester_id: requesterId,
            token_id: tokenId,
          },
          gas: "300000000000000",
          attachedDeposit: "1",
        });
        break;
      default:
        // Do Nothing
    }
    setOrders(orders);
    const order = await wallet.account().functionCall({
      contractId: "order-book.frontier.test.near",
      methodName: "create_order",
      args: {
        requester_id: currentUser.accountId,
        owner_id: signerId,
        token_id: itemId,
      },
      gas: "300000000000000",
      attachedDeposit: "1",
    });
  }

  const OrderActionButton = ({ value, column, row }) => {
    const requesterId = row.original.requester_id;
    const tokenId = row.original.token_id;
    const status = row.original.status;

    return (
      <div className="flex items-center">
        {/* <div className="flex-shrink-0 h-10 w-10">
          <img className="h-10 w-10 rounded-full" src={row.original[column.imgAccessor]} alt="" />
        </div> */}
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">
          { (role === "PRODUCER" && (status === "NEW" || status === "ACCEPTED")) || (role === "DISTRIBUTOR" && status === "IN_TRANSIT") ?
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => doOrderAction(requesterId, tokenId, status)}
            >
              {role === "PRODUCER" ? (status === "NEW" ? "Accept" : "Execute") : (status === "IN_TRANSIT" ? "Complete" : "")}
            </button>
            : null }
          </div>
        </div>
      </div>
      
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        Cell: AvatarCell,
      },
      {
        Header: "Requester",
        accessor: "requester_id",
      },
      {
        Header: "Update",
        Cell: OrderActionButton,
      },
    ],
    []
  );

  // Remove button, move to useEffect
  async function loadOrders() {
    let orders;
    switch (role) {
      case "PRODUCER":
        orders = await wallet.account().viewFunction(
          "order-book.frontier.test.near", // enum this
          "get_orders_by_assignee", // enum this?
          { assignee_id: currentUser.accountId, limit: PER_PAGE_LIMIT } // page limit tracks table
        );
        break;
      case "DISTRIBUTOR":
        orders = await wallet.account().viewFunction(
          "order-book.frontier.test.near", // enum this
          "get_orders_by_requester", // enum this?
          { requester_id: currentUser.accountId, limit: PER_PAGE_LIMIT } // page limit tracks table
        );
        break;
      default:
        orders = [];
    }
    setOrders(orders);
  }

  // useEffect(() => {
  //   let offset;
  //   if (page < 1) {
  //     setPage(1);
  //     offset = 0;
  //   } else {
  //     offset = (page - 1) * PER_PAGE_LIMIT;
  //   }
  //   // // method on the smart contract
  //   // const id = setInterval(() => {

  //   // }, 1000);

  //   // return () => clearInterval(id);
  // }, [page]);

  return (
    <>
      <h1 className="text-xl font-semibold">Orders</h1>
      <div className="mt-4">
        <button onClick={loadOrders}>Refresh</button>
        <Table columns={columns} data={orders || []} />
      </div>
    </>
  );
};

export default OrderTable;
