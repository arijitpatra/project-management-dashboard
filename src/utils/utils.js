// need to think differently about the ids
export const data = {
  generatedId: 5,
  boards: [
    {
      id: 1,
      title: "Teams",
      cards: [
        {
          id: 2,
          title: "Engineering",
          text: "Our weapons are HTML, CSS, JavaScript",
        },
        {
          id: 3,
          title: "Design",
          text: "Our weapons are Figma and Sketch",
        },
        {
          id: 4,
          title: "Business",
          text: "Our weapons are Excel and Data",
        },
      ],
    },
  ],
};

export const onDragOver = (e) => {
  e.preventDefault();
};

export const onDrop = (e, title, onDragAndDropChange) => {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  // e.currentTarget.appendChild(document.getElementById(data));
  e.dataTransfer.clearData("text");
  onDragAndDropChange(data, title);
};

export const onDragStart = (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
};
