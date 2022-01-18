import React from "react";
import { useState } from "react";

export function Item({ contract, id, name, labelled, creator }) {
  const [checked, setChecked] = useState(labelled);

  const complete = ({ target }) => {
    setChecked(target.checked);
    contract.update({ id, updates: { name, labelled: target.checked } });
  };

  const del = () => {
    // on clicking the delete button invoke the del method on
    // the smart contract
    contract.del({ id });
  };

  return (
    <>
      <tr key={id}>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-900">{name}</div>
              <div class="text-sm text-gray-500">{id}</div>
            </div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">{creator}</div>
          {/* <div class="text-sm text-gray-500">{id}</div> */}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          {labelled ? (
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Active
            </span>
          ) : (
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
              Needs Label
            </span>
          )}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          Labels will go here
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button onClick={del} class="text-indigo-600 hover:text-indigo-900">
            Delete
          </button>
        </td>
      </tr>
      {/* <p>
        <input type="checkbox" checked={checked} onChange={complete} />
        {name}
      </p>
      <button onClick={del}>delete</button> */}
    </>
  );
}
