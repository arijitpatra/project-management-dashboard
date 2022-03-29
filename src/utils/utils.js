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
