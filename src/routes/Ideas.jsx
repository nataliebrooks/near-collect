import React from "react";
import List from "../components/common/List";

const ARRAY_SIZE = 20;
const RESPONSE_TIME_IN_MS = 1000;

function loadItems() {
  return new Promise((resolve) => {
    let newArray = [];

    // Load data
    setTimeout(() => {
      newArray = [
        {
          description: "Marketplaces dedicated to anything you could think of, from any angle you can think of (multiple marketplaces hosting the same items could be marketted in different ways)"
        },
        {
          description: "Interior designers or hobbyists could query furniture and curate entire spaces using available, used furniture"
        },
        {
          description: "Fashion designers or hobbyists could curate outfits and costumes, or offer entire collections (since item owner history is preserved)"
        },
        {
          description: "Thrift stores can more easily create websites and reach larger audiences with their inventory"
        },
        {
          description: "Refurbishment services -- existing shoe repair, electronic repair, and more could utilize the inventory for constant business"
        },
        {
          description: "Necessity kits for new home owners, or easily disbursable Disaster relief; lost items could even potentially refind original owners"
        },
        {
          description: "Users in unserviced areas could offer their recyclables to recycling services in network"
        },
        {
          description: "\"Raw product\" wholesalers; surplus items can be traded as commodities"
        },
        {
          description: "Possibility to curb food waste from restaurants, grocery stores, and community members"
        },
        {
          description: "Users could itemize their possessions and create tools to facilitate personal organization or community initiatives (trading, borrowing...)"
        },
        {
          description: "Especially common items could be identified and corporations could be held responsible for their wasteful products"
        },
        {
          description: "A closed loop of packaging able to be reused by corporations"
        },
        {
          description: "Storage for seasonal items (offering your christmas decorations after the holidays then requesting them back before the holidays)"
        },
        {
          description: "Data projects tracking where our waste goes"
        },
        {
          description: "And so much more..."
        }
      ]

      resolve({ hasNextPage: false, data: newArray });
    }, RESPONSE_TIME_IN_MS);
  });
}


const Idea = ({ idea }) => {
  return (
    <>
      <div className="flex p-2">
        <div className="flex flex-1 shadow-lg hover:shadow-sm hover:-translateY-0.5 border-2 border-black">
            <p className="leading-normal m-2">{idea.description}</p>
        </div>
      </div>
    </>
  );
};

const renderListItem = (it) => {
  return <Idea idea={it} />;
};

export default function Ideas() {
  return (
    <main className="flex flex-col justify-start h-full w-full">
      <div className="flex flex-1 flex-col justify-start pt-32 pb-16 pl-16 pr-4">
        <h1 className="text-5xl font-bold text-green-600">ideas</h1>
        <h6 className="text-xl">for the common good.</h6>
        <br />
        <p>
          All of this is made possible with sorted, itemized second-hand products and a reliable, grass-roots supply chain.
        </p>
      </div>
      <List loadData={loadItems} renderListItem={renderListItem} />
    </main>
  );
}

Ideas.propTypes = {};
