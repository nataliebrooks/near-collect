import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

export default function Question({ contract, currentUser }) {
  const [answer, setAnswer] = useState("");
  const location = useLocation();
  let image;

  if (location && location.state) {
    image = location.state.image;
  }

  return (
    <main className="flex flex-col justify-between h-screen w-full p-8">
      <header>
        <Link to="/">Back</Link>
      </header>
      <section className="flex-1 grid content-center">
        <h2>What was in that picture? What things? And how many of them?</h2>
        <input
          className="appearance-none block bg-slate-200 text-slate-700 pxborder rounded leading-tight focus:outline-none focus:bg-white"
          id={"input_"} // This could be dynamic, question underscored
          type="text"
          placeholder=""
          value={answer}
          onChange={({ target }) => setAnswer(target.value)}
        />
        <Link to="/submit" state={{ image, answer }}>
          Next
        </Link>
      </section>
    </main>
  );
}

Question.propTypes = {};
