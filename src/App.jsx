import { useState } from "react";

export default function App() {
  const [scores, setScores] = useState([0, 0]);
  const [activePlayer, setActivePlayer] = useState(0);
  const [diceNumber, setDiceNumber] = useState("dice-1.png");
  const [playing, setPlaying] = useState(true);
  const [currentScore, setCurrentScore] = useState(0);

  function init() {
    setScores([0, 0]);
    setActivePlayer(0);
    setPlaying(true);
    setCurrentScore(0);
  }

  function switchPlayer() {
    setActivePlayer((activePlayer) => (activePlayer === 0 ? 1 : 0));
  }

  function rollDice() {
    if (!playing) return;

    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    setDiceNumber(`dice-${dice}.png`);

    // 2. Check for rolled 1
    if (dice !== 1) {
      setCurrentScore((currentScore) => (currentScore += dice));
    } else {
      // Switch to next player
      setCurrentScore(() => 0);
      switchPlayer();
    }
  }

  function holdScore() {
    if (!playing) return;
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;

    if (scores[activePlayer] >= 100) {
      setPlaying(false);
    } else {
      switchPlayer();
      setCurrentScore(() => 0);
    }
  }

  return (
    <main>
      <Player
        numPlayer={0}
        activePlayer={activePlayer}
        scores={scores}
        currentScore={currentScore}
        playing={playing}
      />
      <Player
        numPlayer={1}
        activePlayer={activePlayer}
        scores={scores}
        currentScore={currentScore}
        playing={playing}
      />

      <img
        src={diceNumber}
        alt="Playing dice"
        className={`dice ${!playing && "hidden"}`}
      />
      <button className="btn btn--new" onClick={init}>
        🔄 New game
      </button>
      <button className="btn btn--roll" onClick={rollDice}>
        🎲 Roll dice
      </button>
      <button className="btn btn--hold" onClick={holdScore}>
        📥 Hold
      </button>
    </main>
  );
}

function Player({ numPlayer, activePlayer, scores, currentScore, playing }) {
  return (
    <section
      className={`player player--${numPlayer} ${
        activePlayer === numPlayer && playing ? "player--active" : ""
      } ${!playing && activePlayer === numPlayer ? "player--winner" : ""}`}
    >
      <h2 className="name" id={`name--${numPlayer}`}>
        Player {numPlayer + 1}
      </h2>
      <p className="score" id={`score--${numPlayer}`}>
        {scores[numPlayer]}
      </p>
      <div className="current">
        <p className="current-label">Current</p>
        <p className="current-score" id={`current--${numPlayer}`}>
          {activePlayer === numPlayer ? currentScore : 0}
        </p>
      </div>
    </section>
  );
}
