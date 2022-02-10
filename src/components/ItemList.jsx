import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import List from './common/List'

const ARRAY_SIZE = 2
const RESPONSE_TIME_IN_MS = 1000

function loadItems (startCursor = 0) {
  return new Promise((resolve) => {
    let newArray = []

    // Load data
    setTimeout(() => {
      for (let i = startCursor; i < startCursor + ARRAY_SIZE; i++) {
        const newItem = {
          key: i,
          media: 'https://picsum.photos/332/720',
          description: 'some shoes, a hat, pens',
          signerId: `user #${i}`
        }
        newArray = [...newArray, newItem]
      }

      resolve({ hasNextPage: true, data: newArray })
    }, RESPONSE_TIME_IN_MS)
  })
}

const updateItem = () => {}

const Item = ({ item }) => {
  const [answer, setAnswer] = useState('')
  return (
    <>
      <div className="flex flex-1 flex-col h-screen justify-between m-2 shadow-lg rounded-lg">
          <div className="flex justify-center flex-1 overflow-hidden">
            <img
              className="w-full h-full bg-cover object-cover object-center"
              src={item.media}
            />
          </div>
          <div className="flex flex-col p-4">
            <select
              className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Category Select"
            >
              <option selected>Category</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <p className="leading-normal text-sm truncate">
              Label this item with a comma separated list
            </p>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              placeholder="iphone charger, white"
              value={answer}
              onChange={({ target }) => setAnswer(target.value)}
            />
            <div className="flex justify-end">
              <button onClick={updateItem}>Submit</button>
            </div>
          </div>
        </div>
    </>
  )
}

const renderListItem = (item) => {
  return <Item item={item} />
}

const ItemList = () => {
  return (
    <>
      <Link to="/">Back</Link>
      <List loadData={loadItems} renderListItem={renderListItem} />
    </>
  )
}

export default ItemList

// May want to move this out, into Items route as data will change depending on role
// const NEW_ITEMS_QUERY = gql`
//   query {
//     items(first: 5, where: { status: NEW }) {
//       id
//       signerId
//       status
//       category
//       labels
//     }
//   }
// `;
