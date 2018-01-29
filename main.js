var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init(); // funcion que corre, cuando la pagina se carga al principio.

function init() {
  setUpModeButtons();
  setUpSquares();
  reset();
}

function setUpModeButtons() {
  // mode buttons event listeners
      for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
          modeButtons[0].classList.remove("selected");
          modeButtons[1].classList.remove("selected");
          this.classList.add("selected");
          // add logic to buttons
          /* Forma mas sencilla de escribir el if --> this.textContent === "Easy" ? numSquares = 3; numSquares = 6; */
          if (this.textContent === "Easy") {
              numSquares = 3;
          } else {
            numSquares = 6;
          }
          reset();
        });
    }
}

function setUpSquares() {
  // lo que hacemos, es coger el indice de squares y ponerselo a los colores.
  for (var i = 0; i < squares.length; i++) {
      // añadir event listeners a los squares.
      squares[i].addEventListener("click", function(){
        // grab color of clicked square.
        var clickedColor = this.style.backgroundColor;
        // compare it with the pickedColor
        if(clickedColor === pickedColor){
          message.textContent = "Correct!";
          resetButton.textContent = "Play Again?";
          changeColors(clickedColor); // funcion que cambia el color de todos los cuadros.
          h1.style.backgroundColor = clickedColor;
        } else {
          this.style.backgroundColor = "#232323";
          message.textContent = "Try Again";
        }
      });
  };
}



function reset() {
  colors = generateRandomColors(numSquares);
  // pick new random color from array
  pickedColor = pickColor();
  // change color display to match picked color.
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Colors";
  message.textContent = "";
  // change colors of squares.
  for (var i = 0; i < squares.length; i++) {
    if(colors[i]){ // si hay colors los ponemos si no lo ocultamos.
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelBlue";
}


// resetButton actionListener
resetButton.addEventListener("click", function(){
    reset();
});


// loop throw squares.

function changeColors(color) {
  for (var i = 0; i < squares.length; i++) {
    // cambiar el color de todos los cuadros al elegido.
    squares[i].style.backgroundColor = color;
  }
}

// funcion para coger el color a adivinar.
function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

// funcion que servira para generar colores
function generateRandomColors(num) {
  // make an array
  var arr = [];
  // add num random colors to array
  for (var i = 0; i < num; i++) {
    // get Random color and push to array
    arr.push(randomColor());
  }

  // return that array
  return arr;
}

//
function randomColor() {
  // pick a "red" from 0-255
  var red = Math.floor(Math.random() * 256);
  // pick a "green" from 0-255
  var green = Math.floor(Math.random() * 256);
  // pick a "blue" from 0-255
  var blue = Math.floor(Math.random() * 256);
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}
