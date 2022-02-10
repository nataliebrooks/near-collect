import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import List from '../components/common/List'

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
      <div className="flex flex-1 flex-col justify-between m-2 shadow-lg rounded-lg">
          <div className="flex justify-center flex-1 overflow-hidden">
            <img
              className="w-full h-full bg-cover object-cover object-center"
              src={item.media}
            />
          </div>
          <div className="flex flex-col p-4">
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

const Items = () => {
  return (
    <>
      <Link to="/">Back</Link>
      <List loadData={loadItems} renderListItem={renderListItem} />
    </>
  )
}

export default Items

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
