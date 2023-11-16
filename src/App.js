import React, { useState, useEffect } from 'react';
import './App.css';

// Þegar ég byrja að draga draggable
function dragStart(event) {
  //console.log('dragStart event', event.target.classList);
  event.dataTransfer.setData("text", event.target.id); // or "text/plain" but just "text" would also be fine since we are not setting any other type/format for data value
}

// Þegar ég fer inn á svæði droppable með draggable 
function dragEnter(event) {
  if(!event.target.classList.contains("dropped") || event.target.classList.contains("droppable")) {
    // console.log('dragEnter event', event.target.classList);
    event.target.classList.remove("dropped");
    event.target.classList.add("droppable-hover");
    // console.log('dragEnter event 2', event.target.classList);
  }
}

// Þegar ég er yfir svæði droppable með draggable
function dragOver(event) {
  if(!event.target.classList.contains("dropped")) {
    event.preventDefault(); // Prevent default to allow drop
    //console.log('dragOver event number ',i, event.target.classList);
  }
}

// Þegar ég fer út af svæði droppable með draggable
function dragLeave(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
    //console.log('dragLeave event', event.target.classList);
  }
  if(event.target.classList.contains("dropped")) {
    event.target.classList.remove("dropped");
    //console.log('dragLeave event', event.target.classList);
  }
}

// Þegar ég sleppi draggable á svæði droppable
function drop(event) {
  //console.log('drop event 1', event.target.classList);
  event.preventDefault(); // This is in order to prevent the browser default handling of the data
  event.target.classList.remove("droppable-hover");
  // console.log('drop event 2', event.target.classList);
  const draggableElementData = document.querySelector(".draggable")
  // console.log('image draggable', draggableElementData);
  // console.log('drop event 4', event.target.classList);
  console.log('image draggable before change', draggableElementData);
  console.log('draggableElementData.classList: ', draggableElementData.classList);
  draggableElementData.classList.add("dragged");
  console.log('draggableElementData.classList 2: ', draggableElementData.classList);
  console.log('image draggable after change', draggableElementData);
  // console.log('drop event 5', event.target.classList);
  if (!event.target.classList.contains("dropped") && !event.target.classList.contains("draggable")) {
    event.target.appendChild(draggableElementData);
  }
  event.target.classList.add("dropped");
}

function App() {
  const [animationDuration, setAnimationDuration] = useState(10);

  useEffect(() => {

    const draggableElements = document.querySelectorAll(".draggable");
    const droppableElements = document.querySelectorAll(".droppable");
    console.log('draggableElements', draggableElements);
    console.log('droppableElements', droppableElements);

    draggableElements.forEach(elem => {
      elem.addEventListener("dragstart", dragStart);
      // elem.addEventListener("drag", drag); // Fires when a dragged item (element or text selection) is dragged
      // elem.addEventListener("dragend", dragEnd); // Fires when a drag operation ends (such as releasing a mouse button or hitting the Esc key) - After the dragend event, the drag and drop operation is complete
    });

    droppableElements.forEach(elem => {
      elem.addEventListener("dragenter", dragEnter);
      elem.addEventListener("dragover", dragOver);
      elem.addEventListener("dragleave", dragLeave);
      elem.addEventListener("drop", drop);
    });

  }, []);

    

  const handleSliderChange = (event) => {
    setAnimationDuration(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
      <section className="droppable-elements">
          <div className="droppable" ></div>
          <div className="droppable dropped" ><span>
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
          <div className="droppable"><span></span></div>
        </section>
        <h1> Hæ, þetta er ég, Ísak :^) </h1> 
        <h2> Sjáðu hvað ég get farið hratt! Þú getur líka fært mig í annað box!</h2>
        <p>Ég notaði React til að setja upp verkefnið og HTML Drag & Drop til að leika mér! </p>
        <input  
          type="range"
          min="1"
          max="20"
          value={animationDuration}
          onChange={handleSliderChange}
        />
        <span>{`${21-animationDuration} Km/klst`}s</span> {}
      </header>
    </div>
  );
}

export default App;