import React, { useState, useEffect } from 'react';
import './App.css';
//asdfasdfasdfasdf
/*
const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");
console.log('draggableElements', draggableElements);
console.log('droppableElements', droppableElements);

draggableElements.forEach(elem => {
  elem.addEventListener("dragstart", dragStart); // Fires as soon as the user starts dragging an item - This is where we can define the drag data
  // elem.addEventListener("drag", drag); // Fires when a dragged item (element or text selection) is dragged
  // elem.addEventListener("dragend", dragEnd); // Fires when a drag operation ends (such as releasing a mouse button or hitting the Esc key) - After the dragend event, the drag and drop operation is complete
});

droppableElements.forEach(elem => {
  elem.addEventListener("dragenter", dragEnter); // Fires when a dragged item enters a valid drop target
  elem.addEventListener("dragover", dragOver); // Fires when a dragged item is being dragged over a valid drop target, repeatedly while the draggable item is within the drop zone
  elem.addEventListener("dragleave", dragLeave); // Fires when a dragged item leaves a valid drop target
  elem.addEventListener("drop", drop); // Fires when an item is dropped on a valid drop target
});
*/

function dragStart(event) {
  //console.log('dragStart event', event.target.classList);
  event.dataTransfer.setData("text", event.target.id); // or "text/plain" but just "text" would also be fine since we are not setting any other type/format for data value
}

function dragEnter(event) {
  if(!event.target.classList.contains("dropped")) {
    //console.log('dragEnter event', event.target.classList);
    event.target.classList.add("droppable-hover");
    //console.log('dragEnter event 2', event.target.classList);
  }
}

let i = 0;
function dragOver(event) {
  i=i+1;
  if(!event.target.classList.contains("dropped")) {
    event.preventDefault(); // Prevent default to allow drop
    //console.log('dragOver event number ',i, event.target.classList);
  }
}

function dragLeave(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
    //console.log('dragLeave event', event.target.classList);
  }
}

function drop(event) {
  console.log('drop event 1', event.target.classList);

  event.preventDefault(); // This is in order to prevent the browser default handling of the data
  event.target.classList.remove("droppable-hover");
  console.log('drop event 2', event.target.classList);

  // useless i think // const draggableElementData = event.dataTransfer.getData("text"); // Get the dragged data. This method will return any data that was set to the same type in the setData() method
  const draggableElementData = document.querySelector(".draggable")
  console.log('image draggable', draggableElementData);

  // const draggableElement = document.getElementById(draggableElementData);
  event.target.classList.add("dropped");
  console.log('drop event 4', event.target.classList);

  //event.target.style.backgroundColor = window.getComputedStyle(draggableElement).color;
  console.log('image draggable before change', draggableElementData);
  console.log('draggableElementData.classList: ', draggableElementData.classList);
  draggableElementData.classList.add("dragged");
  console.log('draggableElementData.classList 2: ', draggableElementData.classList);
  console.log('image draggable after change', draggableElementData);
  console.log('drop event 2', event.target.classList);

  draggableElementData.setAttribute("draggable", "false");
  event.target.insertAdjacentHTML("afterbegin", `<i class="fas fa-${draggableElementData}"></i>`)
}

function App() {
  const [animationDuration, setAnimationDuration] = useState(10);

  useEffect(() => {

    const draggableElements = document.querySelectorAll(".draggable");
    const droppableElements = document.querySelectorAll(".droppable");
    console.log('draggableElements', draggableElements);
    console.log('droppableElements', droppableElements);

    draggableElements.forEach(elem => {
      elem.addEventListener("dragstart", dragStart); // Fires as soon as the user starts dragging an item - This is where we can define the drag data
      // elem.addEventListener("drag", drag); // Fires when a dragged item (element or text selection) is dragged
      // elem.addEventListener("dragend", dragEnd); // Fires when a drag operation ends (such as releasing a mouse button or hitting the Esc key) - After the dragend event, the drag and drop operation is complete
    });

    droppableElements.forEach(elem => {
      elem.addEventListener("dragenter", dragEnter); // Fires when a dragged item enters a valid drop target
      elem.addEventListener("dragover", dragOver); // Fires when a dragged item is being dragged over a valid drop target, repeatedly while the draggable item is within the drop zone
      elem.addEventListener("dragleave", dragLeave); // Fires when a dragged item leaves a valid drop target
      elem.addEventListener("drop", drop); // Fires when an item is dropped on a valid drop target
    });

  }, []);

    

  const handleSliderChange = (event) => {
    setAnimationDuration(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
      <section className="droppable-elements">
          <div className="droppable" data-draggable-id="house1"><span></span></div>
          <div className="droppable" data-draggable-id="house2"><span>
            <img
              src={process.env.PUBLIC_URL + '/logo-mr-man.png'}
              className="draggable"
              draggable="true"
              alt="logo"
              style={{
                animation: `App-logo-spin infinite ${animationDuration}s linear`,
              }}
            />
          </span></div>
          <div className="droppable" data-draggable-id="house3"><span></span></div>
        </section>
        <h1> Hæ kennari, þetta er ég, Ísak :^) </h1> 
        <p>Ég notaði React fyrir verkefnið og HTML Drag & Drop! Sjáðu hvað ég get farið hratt! </p>
        <input
          type="range"
          min="1"
          max="20"
          value={animationDuration}
          onChange={handleSliderChange}
        />
        <span>{`${21-animationDuration} Km/klst`}s</span> {}
        <a
          className="App-link"
          href="./location.html"
          rel="noopener noreferrer"
        >
          Ekki smella!!!
        </a>
      </header>
    </div>
  );
}

export default App;