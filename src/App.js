import { useState } from "react";
import "./App.scss";
import BoardComponent from "./components/BoardComponent/BoardComponent";

// need to think differently about the ids
const x = [
  {
    id: 1,
    title: "Teams",
    cards: [
      {
        id: 1,
        title: "Engineering",
        text: "Our weapons are HTML, CSS, JavaScript",
      },
      {
        id: 2,
        title: "Design",
        text: "Our weapons is Figma",
      },
      {
        id: 3,
        title: "Business",
        text: "Our weapons are Excel and Data",
      },
    ],
  },
];

function App() {
  // TODO: localStorage setting and retrieving
  const [boards, setBoards] = useState(x);

  const addCard = (boardTitle, cardTitle, cardText) => {
    const updatedData = boards.map((item) => {
      if (item.title === boardTitle) {
        item.cards.push({
          id: item.cards.length + 1,
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
        id: prevState.length + 1,
        title: title,
        cards: [],
      },
    ]);
  };

  const handleCardDelete = (boardTitle, cardId) => {
    const updatedData = boards.map((item) => {
      if (item.title === boardTitle) {
        item.cards = item.cards.filter((card) => card.id !== cardId);
      }
      return item;
    });
    setBoards(updatedData);
  };

  const handleBoardDelete = (boardId) => {
    const updatedData = boards.filter((board) => board.id !== boardId);
    setBoards(updatedData);
  };

  const handleDragAndDropChange = (textData, boardTitle) => {
    const [cardTitle, cardText] = textData.split("*");
    const x = boards.map((item) => {
      const cards = item.cards.filter(
        (i) => i.title !== cardTitle && i.text !== cardText
      );
      item.cards = cards;
      return item;
    });

    const updatedData = x.map((item) => {
      if (item.title === boardTitle) {
        item.cards.push({
          id: item.cards.length + 1,
          title: cardTitle,
          text: cardText,
        });
      }
      return item;
    });
    console.log(updatedData);
    // const updatedData = // logic for filter

    setBoards(updatedData);
  };

  return (
    <div className="App">
      <h1>Dashboard</h1>
      {boards.map((board, index) => {
        return (
          <BoardComponent
            key={index}
            title={board.title}
            cards={board.cards}
            onBtnClick={(title, text) => addCard(board.title, title, text)}
            cardDelete={(boardTitle, id) => handleCardDelete(boardTitle, id)}
            boardDelete={() => handleBoardDelete(board.id)}
            onDragAndDropChange={(textData, title) =>
              handleDragAndDropChange(textData, title)
            }
          />
        );
      })}
      <BoardComponent onBtnClick={(title) => addBoard(title)} />
    </div>
  );
}

export default App;
