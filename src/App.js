import { useState } from "react";
import "./App.scss";
import BoardComponent from "./components/BoardComponent/BoardComponent";

const x = [
  {
    title: "Board 1",
    cards: [
      {
        title: "something",
        text: "loreiuyrm hsd jhyd sdishudisd djjdjdh",
      },
      {
        title: "funny",
        text: "maaaar maaar maar sale ko maar",
      },
    ],
  },
];

function App() {
  const [boards, setBoards] = useState(x);

  const addCard = (boardTitle, cardTitle, cardText) => {
    const updatedData = boards.map((item) => {
      if (item.title === boardTitle) {
        item.cards.push({
          title: cardTitle,
          text: cardText,
        });
      }
      return item;
    });
    setBoards(updatedData);
  };

  const addBoard = (title) => {
    setBoards((prevState) => [
      ...prevState,
      {
        title: title,
        cards: [],
      },
    ]);
  };

  return (
    <div className="App">
      <h2>Dashboard</h2>
      {boards.map((board, index) => {
        return (
          <BoardComponent
            key={index}
            title={board.title}
            cards={board.cards}
            onBtnClick={(title, text) => addCard(board.title, title, text)}
          />
        );
      })}
      <BoardComponent onBtnClick={(title) => addBoard(title)} />
    </div>
  );
}

export default App;
