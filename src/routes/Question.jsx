import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

export default function Question({ contract, currentUser }) {
  const [answer, setAnswer] = useState("");
  const [showImage, setShowImage] = useState(false);
  const location = useLocation();
  let image = "https://picsum.photos/332/720";

  if (location && location.state) {
    image = location.state.image;
  }

  return (
    <main className="flex flex-col justify-start h-full w-full">
      <div className="flex flex-1 flex-col justify-start pt-32 pb-16 pl-16 pr-4">
        <h1 className="text-5xl font-bold text-green-600">describe</h1>
        <h6 className="text-xl">what items are in your pile</h6>
      </div>
      <div className="flex flex-1 flex-col px-4">
        <textarea
          className="w-full px-4 py-2 text-gray-700 border-2 focus:outline-none"
          rows="4"
          placeholder="Two hats, an iphone charger, a water bottle..."
          value={answer}
          onChange={({ target }) => setAnswer(target.value)}
        />
        <div className="flex">
          <Link
            to="/camera"
            className="flex-1 m-2 bg-transparent shadow-lg hover:shadow-sm hover:bg-black  hover:text-green-500 py-2 px-4 border-2 border-black hover:border-transparent"
          >
            <h6 className="text-xl">retake picture</h6>
          </Link>
          <Link
            to="/submit"
            className={
              "flex-1 m-2 bg-transparent shadow-lg hover:shadow-sm  hover:bg-black  hover:text-green-500 py-2 px-4 border-2 border-black hover:border-transparent"
            }
          >
            <h6 className="text-xl">submit</h6>
          </Link>
        </div>
        <button
          className="flex-1 m-2 bg-transparent shadow-lg hover:shadow-sm  hover:bg-black  hover:text-green-500 py-2 px-4 border-2 border-black hover:border-transparent"
          onClick={() => setShowImage(!showImage)}
        >
          show image
        </button>
        {showImage ? (
          <div className="flex justify-center overflow-hidden px-2">
            <img
              className="w-full h-full bg-cover object-cover object-center rounded-lg"
              src={image}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
}

{
  /* <main className="flex flex-1 flex-col w-full">
<div className="flex justify-center overflow-hidden px-4">
  <img
    className="w-full h-full bg-cover object-cover object-center rounded-lg"
    src={image}
  />
</div>
<div className="flex flex-col p-4">
  <p>Please describe what items are in the image</p>
  <textarea
    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
    rows="4"
    placeholder="Two hats, an iphone charger, a water bottle..."
    value={answer}
    onChange={({ target }) => setAnswer(target.value)}
  />
  <div className="flex justify-between">
    <Link to="/camera">Retake picture</Link>
    <Link to="/submit" state={{ image, answer }}>
      Next
    </Link>
  </div>
</div>
</main> */
}

Question.propTypes = {};
