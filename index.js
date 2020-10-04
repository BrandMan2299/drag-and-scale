dragAndResizeElement(document.getElementById("main"));

function dragAndResizeElement(element) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  let playgroundsBounds = document
    .querySelector("#playground")
    .getBoundingClientRect();

  if (document.getElementById("header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById("header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    element.onmousedown = dragMouseDown;
  }

  //Attach onmousedown listeners to all 8 resizers
  Array.from(document.querySelectorAll(".resizers")).map(
    (resizer) => (resizer.onmousedown = resizeMouseDown)
  );

  function dragMouseDown(e) {
    console.log("dragMouseDown");
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    console.log("elementDrag");
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    console.log(pos1 + " " + pos2 + " " + pos3 + " " + pos4);
    //save new positions
    let newX = element.offsetLeft - pos1;
    let newY = element.offsetTop - pos2;
    //check new position does not cross bounds:
    if (
      playgroundsBounds.left <= newX &&
      playgroundsBounds.right - element.offsetWidth >= newX
    ) {
      // set the element's new X position:
      element.style.left = element.offsetLeft - pos1 + "px";
    }
    if (
      playgroundsBounds.top <= newY &&
      playgroundsBounds.bottom - element.offsetHeight >= newY
    ) {
      // set the element's new Y position:
      element.style.top = element.offsetTop - pos2 + "px";
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function resizeMouseDown(e) {
    console.log(`i am ${e.target.id} and i'm a resizer`);
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;

    document.onmousemove = (secondE) =>
      elementResize(
        secondE,
        e.target.classList.contains("width"),
        e.target.classList.contains("height"),
        e.target.id
      );
  }

  function elementResize(e, width, height, trigererId) {
    //e: the mousemove event
    //width: boolean, should the stretch affect rhe width
    //height: boolean, should the stretch affect the height
    //trigererId: string, id of the clicked resizer

    console.log("resizing " + e.target.id);
    //setting e to himself or to a window event, in case the mouse cursor exits the resizer while pressing
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    //save new positions
    let newX = element.offsetLeft - pos1;
    let newY = element.offsetTop - pos2;
    // set the element's new size:
    if (
      height &&
      playgroundsBounds.top <= newY &&
      playgroundsBounds.bottom - element.offsetHeight >= newY
    ) {
      if (trigererId.match(/bottom/)) {
        //if new size is less than 100px don't resize
        if (element.offsetHeight - pos2 < 150) return;
        //change height of window
        element.style.height = element.offsetHeight - pos2 + "px";
        //change height of left and right resizers
        Array.from(document.querySelectorAll(".EW")).map(
          (resizer) => (resizer.style.height = element.style.height)
        );
      }
      if (trigererId.match(/top/)) {
        //if new size is less than 100px don't resize
        if (element.offsetHeight - pos2 * -1 < 150) return;
        //change height of window
        element.style.height = element.offsetHeight - pos2 * -1 + "px";
        //change height of left and right resizers
        Array.from(document.querySelectorAll(".EW")).map(
          (resizer) => (resizer.style.height = element.style.height)
        );
        //change top position of window
        element.style.top = element.offsetTop - pos2 + "px";
      }
    }
    if (
      width &&
      playgroundsBounds.left <= newX &&
      playgroundsBounds.right - element.offsetWidth >= newX
    ) {
      if (trigererId.match(/right/)) {
        //if new size is less than 100px don't resize
        if (element.offsetWidth - pos1 < 150) return;
        //change width of window
        element.style.width = element.offsetWidth - pos1 + "px";
        //change width of bottom and top resizers
        Array.from(document.querySelectorAll(".NS")).map(
          (resizer) => (resizer.style.width = element.style.width)
        );
      }
      if (trigererId.match(/left/)) {
        //if new size is less than 100px don't resize
        if (element.offsetWidth - pos1 * -1 < 150) return;
        //change width of window
        element.style.width = element.offsetWidth - pos1 * -1 + "px";
        //change width of bottom and top resizers
        Array.from(document.querySelectorAll(".NS")).map(
          (resizer) => (resizer.style.width = element.style.width)
        );
        //change left position of window
        element.style.left = element.offsetLeft - pos1 + "px";
      }
    }
  }
}
