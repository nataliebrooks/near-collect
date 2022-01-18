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
    <>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Creator
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Labels
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {items.map((item) => (
                  <Item contract={contract} {...item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
    // <ul>
    //   <div class="flex">
    //   Current Page: {page}
    //   </div>
    //   <button onClick={() => setPage((page) => page - 1)}>&lt;</button>
    //   {" "}
    //   <button onClick={() => setPage((page) => page + 1)}>&gt;</button>
    //   {items.map((item) => (
    //     <li key={item.id}>
    //       <Item contract={contract} {...item} />
    //     </li>
    //   ))}
    // </ul>
  );
}

export default ItemList;