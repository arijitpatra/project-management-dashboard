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

  const addCard = () => {
    console.log("card");
  };

  const addBoard = () => {
    setBoards((item) => [
      ...item,
      {
        title: "Board 2",
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
            onBtnClick={addCard}
          />
        );
      })}
      <BoardComponent onBtnClick={addBoard} />
    </div>
  );
}

export default App;
