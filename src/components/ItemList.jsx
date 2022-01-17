import React from 'react';
import { useEffect, useState } from "react";
import { Item } from "./Item";

const PER_PAGE_LIMIT = 3;

const ItemList = ({ contract }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let offset; 
    if(page < 1) {
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
    <ul>
      <div className="flex">
      Current Page: {page}
      </div>
      <button onClick={() => setPage((page) => page - 1)}>&lt;</button>
      {" "}
      <button onClick={() => setPage((page) => page + 1)}>&gt;</button>
      {items.map((item) => (
        <li key={item.id}>
          <Item contract={contract} {...item} />
        </li>
      ))}
    </ul>
  );
}

export default ItemList;