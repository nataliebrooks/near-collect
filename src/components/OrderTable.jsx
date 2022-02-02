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
  return (
    <div className="flex items-center">
      {/* <div className="flex-shrink-0 h-10 w-10">
        <img className="h-10 w-10 rounded-full" src={row.original[column.imgAccessor]} alt="" />
      </div> */}
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">
          {row.original[column.idAccessor]}
        </div>
      </div>
    </div>
  );
}

const OrderTable = ({ contract, wallet, currentUser, role }) => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  // const { loading, error, data } = useQuery(MY_ORDERS);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "title",
        Cell: AvatarCell,
        idAccessor: "id",
      },
      {
        Header: "Creator",
        accessor: "signerId",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
      {
        Header: "Category",
        accessor: "category",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Labels",
        accessor: "labels",
      },
    ],
    []
  );

  // Remove button, move to useEffect
  async function loadOrders() {
    let orders;
    switch (role) {
      case 'PRODUCER':
        orders = await wallet.account().viewFunction(
          'order-book.frontier.test.near', // enum this
          'get_orders_by_assignee', // enum this?
          { assignee_id: currentUser.accountId, limit: PER_PAGE_LIMIT } // page limit tracks table
        );
        break;
      case 'DISTRIBUTOR':
        orders = await wallet.account().viewFunction(
          'order-book.frontier.test.near', // enum this
          'get_orders_by_requester', // enum this?
          { requester_id: currentUser.accountId, limit: PER_PAGE_LIMIT } // page limit tracks table
        );
        break;
      default:
        orders = []
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
        <Table columns={columns} data={(orders) || []} />
      </div>
    </>
  );
};

export default OrderTable;
