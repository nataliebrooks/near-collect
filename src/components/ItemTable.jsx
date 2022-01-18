import React from "react";
import { useEffect, useState, useMemo } from "react";
import Table, { SelectColumnFilter } from "./Table";
import { Item } from "./Item";
import { classNames } from './shared/Utils'

const PER_PAGE_LIMIT = 3;

function StatusPill({ value }) {
  const status = value === "true" ? "active" : "needs label";

  return (
    <span
      className={
        classNames(
          "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
          status.startsWith("active") ? "bg-green-100 text-green-800" : null,
          status.startsWith("needs label") ? "bg-red-100 text-red-800" : null
        )
      }
    >
      {status}
    </span>
  );
};

const ItemTable = ({ contract }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Creator",
        accessor: "creator",
      },
      {
        Header: "Status",
        accessor: "labelled",
        Filter: SelectColumnFilter,
        filter: "includes",
        Cell: StatusPill
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Labels",
        accessor: "labels",
      },
    ],
    []
  );

  useEffect(() => {
    let offset;
    if (page < 1) {
      setPage(1);
      offset = 0;
    } else {
      offset = (page - 1) * PER_PAGE_LIMIT;
    }

    // every second after the component first mounts
    // update the list of Items by invoking the get
    // method on the smart contract
    const id = setInterval(() => {
      contract
        .get({ offset, limit: PER_PAGE_LIMIT })
        .then((items) => setItems(items));
    }, 1000);

    return () => clearInterval(id);
  }, [page, contract]);

  return (
    <>
      <h1 className="text-xl font-semibold">Items</h1>
      <div className="mt-4">
        <Table columns={columns} data={[...items, ...items, ...items]} />
      </div>
    </>
  );
};

export default ItemTable;
