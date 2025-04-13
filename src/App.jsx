import { useState, useEffect } from "react";
import "./App.css";
import ImageCard from "./components/Card.jsx";
import { fetchImages, getSearchOptions } from "./components/gameServices.js";
function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clicked, setClicked] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);
  const [numberOfCards, setNumberOfCards] = useState(4);
  const [level, setLevel] = useState(1);
  const [searchValue, setSearchValue] = useState("cat");

  const isGameOver = (key) => {
    return clicked.includes(key);
  };

  const isLevelOver = () => {
    return loadedImages.length === clicked.length + 1;
  };
  function showMessage(id) {
    const msg = document.getElementById(id);
    msg.style.opacity = "1";

    setTimeout(() => {
      msg.style.opacity = "0";
    }, 3000); // Show for 3 seconds
  }
  const increaseLevel = () => {
    let new_score = currentScore + 1;
    setCurrentScore(new_score);
    if (new_score > highScore) {
      setHighScore(new_score);
    }
    showMessage("level-up-message");
    setLevel(level + 1);
    setClicked([]);
    setNumberOfCards(numberOfCards < 10 ? numberOfCards + 2 : 10);
    updateSearchValue();
  };

  const updateSearchValue = () => {
    let searchOptions = getSearchOptions();
    let indexOfCurrentOption = searchOptions.indexOf(searchValue);
    if (indexOfCurrentOption < searchOptions.length - 1) {
      setSearchValue(searchOptions[indexOfCurrentOption + 1]);
    } else {
      setSearchValue(searchOptions[0]);
    }
  };

  const processTurn = (key) => {
    setClicked([...clicked, key]);
    let new_score = currentScore + 1;
    setCurrentScore(new_score);
    if (new_score > highScore) {
      setHighScore(new_score);
    }
    shuffleCards();
  };

  const handleCardClick = (key) => {
    if (isGameOver(key)) {
      showMessage("game-over-message");
      resetGame();
    } else if (isLevelOver()) {
      increaseLevel();
    } else {
      processTurn(key);
    }
  };

  function resetGame() {
    setCurrentScore(0);
    setClicked([]);
    setGameOver(false);
    setNumberOfCards(4);
    setSearchValue('cat');
    setLevel(1);
  }

  useEffect(() => {
    const fetchData = async () => {
      let data = await fetchImages(numberOfCards, searchValue);
      let images = data?.map((item) => {
        return { ...item.images.fixed_height, id: item.id, title: item.title };
      });
      setLoadedImages(images);
    };
    fetchData();
  }, [level]);

  const shuffleCards = () => {
    const shuffledImages = [...loadedImages].sort(() => Math.random() - 0.5);
    setLoadedImages(shuffledImages);
  };

  const getCards = () => {
    return loadedImages.map((image) => {
      return (
        <div onClick={(e) => handleCardClick(image.id)} key={image.id}>
          <ImageCard imageUrl={image.url} title={image.title} />
        </div>
      );
    });
  };

  return (
    <div
      className="body"
      style={{
        backgroundImage: `url(./bg3.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div id="level-up-message">
        🎉 Congrats! You’ve advanced to level: {level}! 🎉
      </div>
      <div id="game-over-message">OOPS! Game Over! Try Again!</div>
      <div className="container">
        <div className="header">
          <div>
            <img height={80} src="./brain.png" alt="" />
          </div>
          <div style={{ fontSize: 70 }}>Memory Game</div>
          <div className="stats">
            <span>Highscore:</span>
            <span>{highScore}</span>
            <span>Score:</span>
            <span> {currentScore}</span>
            <span>Level: </span>
            <span>{level}</span>
          </div>
        </div>
        <div className="content">{getCards()}</div>
        <span className="footer">
          Designed by:<span>&nbsp;</span>
          <a href="https://github.com/Sandhusabh" target="/">@SandhuSabh</a>
        </span>
      </div>
    </div>
  );
}

export default App;
// import React from "react";
