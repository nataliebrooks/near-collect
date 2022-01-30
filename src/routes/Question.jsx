import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

export default function Question() {
  const location = useLocation();
  const { image } = location.state;
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    // Call nft_mint function, passing image and answer
    // DO SOMETHING
    setAnswer("");
    setLoading(false);
  };

  return (
    <main className="flex flex-col justify-between h-screen w-full p-8">
      <header>
        <Link to="/">Back</Link>
      </header>
      <section className="flex-1 grid content-center">
        <form onSubmit={handleSubmit}>
          <h2>What was in that picture? What things? And how many of them?</h2>
          <input
            className="appearance-none block bg-slate-200 text-slate-700 pxborder rounded leading-tight focus:outline-none focus:bg-white"
            id={"input_"} // This could be dynamic, question underscored
            type="text"
            placeholder=""
            value={answer}
            onChange={({ target }) => setAnswer(target.value)}
          /> 
          <button 
          disabled={loading || answer === "" || answer == null} // is null or empty check
          > 
              Next
            </button>
        </form>
      </section>
    </main>
  );
}

// Question.propTypes = {
//   image: PropTypes.string.isRequired,
// };
