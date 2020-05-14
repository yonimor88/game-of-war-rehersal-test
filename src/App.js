import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [show, setShow] = useState(1);
  const suit = ["♠️", "♥️", "♦️", "♣️"];
  const rank = [
    { level: "A", value: 1 },
    { level: "2", value: 2 },
    { level: "3", value: 3 },
    { level: "4", value: 4 },
    { level: "5", value: 5 },
    { level: "6", value: 6 },
    { level: "7", value: 7 },
    { level: "8", value: 8 },
    { level: "9", value: 9 },
    { level: "10", value: 10 },
    { level: "J", value: 11 },
    { level: "Q", value: 12 },
    { level: "K", value: 13 }
  ];
  const tempDeck = suit.map(suit => rank.map(rank => ({ rank, suit }))).flat(1);
  const [newDeck, setNewDeck] = useState(tempDeck);
  const [playerDeck, setPlayerDeck] = useState([]);
  const [computerDeck, setComputerDeck] = useState([]);
  
  const [playerData, setPlayerData] = useState({
    name: null,
    wins: 0,
    loses: 0,
    gamesPlayed: 0,
    cards: playerDeck
  });
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [index, setIndex] = useState(0);

  // function that shuffles the deck array
  const shuffleDeck = () => {
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      setNewDeck(([newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]]));
    }
  };

  // function that gives each player 26 parts of the full deck array
  const destributeCards = () => {
    debugger;
    for (let i = 0; i < newDeck.length; i++) {
      if (i <= 25) {
        setPlayerDeck([...playerDeck], [playerDeck.push(newDeck[i])]);
      } else {
        setComputerDeck([...computerDeck], [computerDeck.push(newDeck[i])]);
      }
    }
  };

  // function that set the "show" state to 2 and thus moving the player forward to the game screen-
  // and call the shuffle and destribute functions
  const moveToGame = () => {
    if (input !== "") {
      setShow(2);
      setPlayerData({ ...playerData, name: input });
      shuffleDeck();
      destributeCards();
    } else {
      alert(`Please insert at least one character`);
    }
    console.log(`newDeck`);
    console.log(newDeck);
    console.log(`playerDeck`);
    console.log(playerDeck);
    console.log(`computerDeck`);
    console.log(computerDeck);
  };

  // function that removes the first card in the array of cards of each player and display the card
  const nextCard = () => {
    if (index < playerDeck.length - 1) {
      setIndex(index + 1);
      console.log(playerDeck[index]);
      console.log(computerDeck[index]);
      if (playerDeck[index].rank.value > computerDeck[index].rank.value) {
        setPlayerScore(playerScore + 1);
      } else if (playerDeck[index].rank.value < computerDeck[index].rank.value) {
        setComputerScore(computerScore + 1);
      }
    } else {
      setShow(3);
      if (playerScore > computerScore) {
        setPlayerData({ ...playerData, wins: playerData.wins + 1 });
      } else {
        setPlayerData({ ...playerData, loses: playerData.loses + 1 });
      }
    }
  };

  const currentWinOrLose = () => {
    if (playerScore > computerScore) {
      return <h1 style={{color: 'lightgreen'}}>you are a Winner!!!</h1>;
    } else {
      return <h1 style={{color: 'red'}}>You are a lousy LOOSER BOOOO!!!</h1>;
    }
  };

  const backToStart =() =>{
    setNewDeck(tempDeck)
    setIndex(0)
    setPlayerDeck([])
    setComputerDeck([])
    setShow(1)
    setPlayerData({ ...playerData, name:null });
    setInput('')
    setPlayerScore(0)
    setComputerScore(0)
  }
  // this section is incharge of switching the viewed content
  const showContent = () => {
    if (show === 1) {
      return (
        <div className="register">
          <h1>Ready for WAR!!!</h1>
          <br />
          <input
            placeholder="Enter your name"
            onChange={e => {setInput(e.target.value);}}>
          </input>
          <br />
          <button onClick={moveToGame}>Start </button>
        </div>
      );
    }
    if (show === 2) {
      return (
        <div id="game">
          <h3>Computer</h3>
          <div className="card">
           {computerDeck[index].rank.level} 
           <br/>
           {computerDeck[index].suit} 
          </div>
          <br />
          <div className="card">
            {playerDeck[index].rank.level} 
            <br/>
            {playerDeck[index].suit} 
          </div>
          <h3> {playerData.name}</h3>
          <h3>player score: {playerScore} computer score: {computerScore}</h3>
          <button onClick={nextCard}>next</button>
        </div>
      );
    }
    if (show === 3) {
      return (
        <div id="end">
          {currentWinOrLose()}
          <h1><span style={{color: 'lightgreen'}}>wins: {playerData.wins}</span> / <span style={{color: 'red'}}>loses: {playerData.loses}</span></h1>

          <button onClick={backToStart}>Again?</button>
        </div>
      );
    }
  };

  return <div className="App">{showContent()}</div>;
}

export default App;
