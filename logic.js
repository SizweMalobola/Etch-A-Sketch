//find a way to create a certain number of divs/boxes inside .grid
var gridSize = document.querySelector(".dimentions");
var gridContainer = document.querySelector(".grid");
//var userInput = prompt("Select Grid Size");
// buttons variables
var blackBtn = document.querySelector(".black-color");
var randomBtn = document.querySelector(".random-color");
var gradientBtn = document.querySelector(".gradient");
//state of color when hovering over grid
var currentHoverState = "";
//linear gradient
var lGradient;
//hue to be ligthend
var uniHue;
var lightness = 50;
var lightCounter = 1;
//
function makeBox(input) {
  let boxNum = input * input;
  for (let i = 0; i < boxNum; i++) {
    let boxElement = document.createElement("div");
    boxElement.setAttribute("class", "box");
    //add blackend to new boxes if black-btn is active
    if (blackBtn.classList.contains("active")) {
      boxElement.classList.add("blackend");
    } else if (randomBtn.classList.contains("active")) {
      boxElement.classList.add("rando");
    } else if (gradientBtn.classList.contains("active")) {
      boxElement.classList.add("gradient");
    }
    gridContainer.appendChild(boxElement);
  }

  gridContainer.setAttribute(
    `style`,
    `display:inline-grid;grid-template-columns: repeat(${input},1fr);grid-template-rows:repeat(${input},1fr)`
  );
  gridContainer.style.visibility = "visible";
}
makeBox(16);
//find a way to rest the blocks without refreshing the webpage
//remove .grid children function
function rmChildren() {
  gridContainer.innerHTML = "";
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild);
  }
}
//new grid is made everytime dimentios are changed to avoid boxes stacking up
gridSize.addEventListener("click", function (e) {
  rmChildren();
  let newInput = prompt("Select Grid Size");
  makeBox(newInput);
});
//and of grid and boxes
//
//
//random color
function randoColor() {
  let hue = Math.floor(Math.random() * 360);
  return `hsl(${hue},100%,50%)`;
}
function linearG() {
  let hue = Math.floor(Math.random() * 360);
  uniHue = hue;
  // lightness = 50;
  let directionArr = ["to right", "to bottom right", "to left"];
  let direction = directionArr[Math.floor(Math.random() * 3)];
  lGradient = `linear-gradient(${direction},hsl(${hue},100%,50%),hsl(${hue},100%,75%))`;
}

//make boxes inside grid to chang color depending on which button is active
// black
blackBtn.addEventListener("click", function (e) {
  let btns = document.querySelectorAll(".btn");
  for (let i = 0; i < btns.length; i++) {
    if (btns[i].classList.contains("active")) {
      btns[i].classList.remove("active");
      btns[i].style.cssText = ``;
      for (let i = 0; i < gridContainer.children.length; i++) {
        gridContainer.children[i].classList.remove(currentHoverState);
      }
    }
  }
  currentHoverState = "blackend";
  e.target.classList.add("active");
  e.target.style.cssText = `color:white;background-color:black`;
  for (let i = 0; i < gridContainer.children.length; i++) {
    gridContainer.children[i].classList.add(currentHoverState);
  }
});

randomBtn.addEventListener("click", function (e) {
  let btns = document.querySelectorAll(".btn");
  for (let i = 0; i < btns.length; i++) {
    if (btns[i].classList.contains("active")) {
      btns[i].classList.remove("active");
      btns[i].style.cssText = ``;
      for (let i = 0; i < gridContainer.children.length; i++) {
        gridContainer.children[i].classList.remove(currentHoverState);
      }
    }
  }
  currentHoverState = "rando";
  e.target.classList.add("active");
  e.target.style.cssText = `background-color:${randoColor()}`;
  for (let i = 0; i < gridContainer.children.length; i++) {
    gridContainer.children[i].classList.add(currentHoverState);
  }
});
gradientBtn.addEventListener("click", function (e) {
  let btns = document.querySelectorAll(".btn");
  for (let i = 0; i < btns.length; i++) {
    if (btns[i].classList.contains("active")) {
      btns[i].classList.remove("active");
      btns[i].style.cssText = ``;
      for (let i = 0; i < gridContainer.children.length; i++) {
        gridContainer.children[i].classList.remove(currentHoverState);
      }
    }
  }
  linearG();
  currentHoverState = "gradient";
  e.target.classList.add("active");
  e.target.style.cssText = `background-image:${lGradient}`;
  for (let i = 0; i < gridContainer.children.length; i++) {
    gridContainer.children[i].classList.add(currentHoverState);
  }
});

gridContainer.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("box")) {
    if (e.target.classList.contains("blackend")) {
      e.target.style.cssText = `background-color:black`;
    } else if (e.target.classList.contains("rando")) {
      e.target.style.cssText = `background-color:${randoColor()}`;
    } else if (e.target.classList.contains("gradient")) {
      if (lightness <= 100 && lightCounter == 1) {
        lightness += 2;
      } else if (lightness >= 30) {
        lightCounter = -1;
        lightness -= 2;
      } else {
        lightCounter = 1;
      }
      e.target.style.cssText = `background-color:hsl(${uniHue},100%,${lightness}%)`;
    }
  }
});
