import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

export default function Question({ contract, currentUser }) {
  const [answer, setAnswer] = useState("");
  const location = useLocation();
  let image = "https://picsum.photos/332/720";

  if (location && location.state) {
    image = location.state.image;
  }

  return (
    <main className="flex flex-1 flex-col h-screen justify-between">
      <div className="flex justify-center flex-1 overflow-hidden">
        <img className="w-full h-full bg-cover object-cover object-center" src={image} />
      </div>
      <div className="flex flex-col p-4 border-2">
        <p>Please describe what items are in the image</p>
        <textarea
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          rows="4"
          placeholder="Two hats, an iphone charger, a water bottle..."
          value={answer}
          onChange={({ target }) => setAnswer(target.value)}
        />
        <div className="flex justify-between">
          <Link to="/camera">
            Retake picture
          </Link>
          <Link to="/submit" state={{ image, answer }}>
            Next
          </Link>
        </div>
      </div>
    </main>
  );
}

Question.propTypes = {};
