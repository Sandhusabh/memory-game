import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ImageCard from "./components/Card.jsx";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clicked, setClicked] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [numberOfCards, setNumberOfCards] = useState(4);

  const handleCardClick = (key) => {
    console.log(key);
    if (clicked.includes(key)) {
      console.log("Game Over");
    } else {
      setClicked([...clicked, key]);
    }
  };

  const getCards = () => {
    const cards = [];
    for (let i = 0; i < numberOfCards; i++) {
      let element = (
        <div onClick={(e) => handleCardClick(i)} key={i}>
          <ImageCard key={i} />
        </div>
      );
      cards.push(element);
    }
    return cards;
  };
  return (
    <>
      <div className="App">{getCards()}</div>
    </>
  );
}

export default App;
