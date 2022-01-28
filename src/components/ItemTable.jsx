import { gql, useQuery } from "@apollo/client";
import React, { useMemo, useState } from "react";
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

const ItemTable = ({ contract }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(NEW_ITEMS_QUERY);

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

  return (
    <>
      <h1 className="text-xl font-semibold">Items</h1>
      <div className="mt-4">
        <Table columns={columns} data={(data && data.items) || []} />
      </div>
    </>
  );
};

export default ItemTable;

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
