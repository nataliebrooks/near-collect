import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import List from '../../components/common/List'

const ARRAY_SIZE = 20
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
  return (
    <>
      <div className="flex p-2">
        <div className="flex flex-1 h-16 shadow-lg hover:shadow-sm hover:-translateY-0.5 overflow-hidden border-2 border-black">
          <img
            className="w-full h-full bg-cover object-cover object-center"
            src={item.media}
          />
          <div className="flex flex-1 flex-col justify-center p-4 bg-white">
            <p className="leading-normal truncate">{item.description}</p>
          </div>
            <button
              className="flex-1 m-2 bg-transparent shadow-sm hover:shadow hover:bg-black  hover:text-green-500 py-2 px-4 border-2 border-black hover:border-transparent"
              onClick={() => updateItem()}
            >
              submit
            </button>
        </div>
      </div>
    </>
  )
}

const renderListItem = (item) => {
  return <Item item={item} />
}

const Items = ({ title }) => {
  return (
    <main className="flex flex-col justify-start h-full w-full">
      <div className="flex flex-1 flex-col justify-start pt-32 pb-16 pl-16 pr-4">
        <h1 className="text-5xl font-bold text-green-600">{title}</h1>
      </div>
      <List loadData={loadItems} renderListItem={renderListItem} />
    </main>
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
