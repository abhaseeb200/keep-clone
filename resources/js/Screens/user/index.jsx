import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";

const ItemType = "ITEM";

const DraggableItem = ({ item, index, moveItem }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    // hover: (draggedItem) => {
    //   if (draggedItem.index !== index) {
    //     moveItem(draggedItem.index, index);
    //     draggedItem.index = index;
    //   }
    // },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="draggable-item" style={{ padding: "10px", border: "1px solid #ccc", margin: "5px 0", backgroundColor: "#f9f9f9", cursor: "move" }}>
      {item.name}
    </div>
  );
};

const DragAndDropList = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ]);

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  const saveArrangement = async () => {
    try {
      // Assuming your API endpoint is /api/save-order
      const response = await axios.post("/api/save-order", {
        items: items.map((item, index) => ({ id: item.id, order: index })),
      });
      alert("Arrangement saved successfully!");
    } catch (error) {
      console.error("Error saving arrangement:", error);
      alert("Failed to save arrangement.");
    }
  };

  return (
    <div>
      <h3>Drag and Drop List</h3>
      <div>
        {items.map((item, index) => (
          <DraggableItem key={item.id} item={item} index={index} moveItem={moveItem} />
        ))}
      </div>
      <button onClick={saveArrangement} style={{ marginTop: "10px", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Save Arrangement
      </button>
    </div>
  );
};

const AppTest = () => (
  <DndProvider backend={HTML5Backend}>
    <DragAndDropList />
  </DndProvider>
);

export default AppTest;
