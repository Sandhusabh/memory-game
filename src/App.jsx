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
  const [gameOver, setGameOver] = useState(false);
  const [searchValue, setSearchValue] = useState("SpongeBob SquarePants");

  const isGameOver = (key) => {
    return clicked.includes(key);
  };

  const isLevelOver = () => {
    return loadedImages.length === clicked.length + 1;
  };

  const increaseLevel = () => {
    let new_score = currentScore + 1;
    setCurrentScore(new_score);
    if (new_score > highScore) {
      setHighScore(new_score);
    }
    setLevel(level + 1);
    setClicked([]);
    setNumberOfCards(numberOfCards < 8 ? numberOfCards + 2 : 8);
    updateSearchValue();
  };

  const updateSearchValue = () => {
    let searchOptions = getSearchOptions();
    let indexOfCurrentOption = searchOptions.indexOf(searchValue);
    if (indexOfCurrentOption < searchOptions.length) {
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
    <>
      <div className="container">
        <div className="header">
          <div>logo</div>
          <div>Memory Game</div>
          <div className="stats">
            <div className="highscore">Highscore: {highScore}</div>
            <div className="score">Score: {currentScore}</div>
            <div className="level">Level: {level}</div>
          </div>
        </div>
        <div className="content">{getCards()}</div>
        <div className="footer">Footer</div>
      </div>
    </>
  );
}

export default App;
