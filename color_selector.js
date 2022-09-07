"use strict";
//Making sure that the DOM is loaded, and then reference to getValue (the users input)
window.addEventListener("DOMContentLoaded", getValue);

//the 'getValue' function is the function handler, and the one who call the display functions depending on the users input
function getValue() {
  //the function executes when the event occurs (when the user makes an input)
  document
    .getElementById("color_selector")
    .addEventListener("input", function (event) {
      //we have sort of a chain here, where the different values converts (the actual conversion happens in seperate functions)
      let hexValue = addColor(event); //hexValue value is hex
      displayHex(hexValue);

      let rgbValue = hexToRgb(hexValue); //rgbValue is rgb
      displayRgb(rgbValue);

      let cssValue = rgbToCss(rgbValue); //cssValue is css
      displayCss(cssValue);

      let hslValue = rgbToHsl(rgbValue); //hslValue is hsl
      displayHsl(hslValue);
    });
}

//function where the chosen color fills out the box (and the function we start our chain with in the getValue function)
//it is what the 'event' refers to (starting the chain)
function addColor(event) {
  //setting the background-color to the chosen color
  document.querySelector(".color").style.backgroundColor = event.target.value;
  //here the hex-value is equal to the the color the user inputs
  let hex = event.target.value;
  console.log(hex);
  return hex;
}

//displaying the color as HEX-value in the info box
function displayHex(hexValue) {
  document.querySelector("#hex p").innerHTML = hexValue;
}

//function that converts the HEX-value to RGB
function hexToRgb(hexValue) {
  //splitting it into the three parts the hex-color is builded by
  const rString = hexValue.substring(1, 3);
  const gString = hexValue.substring(3, 5);
  const bString = hexValue.substring(5, 7);
  //turning the splitted parts into numbers
  const r = parseInt(rString, 16);
  const g = parseInt(gString, 16);
  const b = parseInt(bString, 16);

  //storing the values in a variable
  let rgb = {
    r,
    g,
    b,
  };
  //the function returns the converted value rgb
  return rgb;
}

//function that converts RGB-value to CSS-string
function rgbToCss(rgbValue) {
  let css = `rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`;
  return css;
}

//displaying the color as CSS-string in the info box
function displayCss(cssValue) {
  document.querySelector("#css p").innerHTML = cssValue;
}

//displaying the color as RGB-string in the info box
function displayRgb(rgbValue) {
  document.querySelector(
    "#rgb p"
  ).innerHTML = `${rgbValue.r} ${rgbValue.g} ${rgbValue.b}`;
}

//function that converts RGB-value to HSL (some of the code is pasted from the assignment description on Fronter)
function rgbToHsl(rgbValue) {
  //pasted from fronter starts here (it is for the conversion of rgb to hsl)
  rgbValue.r /= 255;
  rgbValue.g /= 255;
  rgbValue.b /= 255;

  let h, s, l;

  const min = Math.min(rgbValue.r, rgbValue.g, rgbValue.b);
  const max = Math.max(rgbValue.r, rgbValue.g, rgbValue.b);

  if (max === min) {
    h = 0;
  } else if (max === rgbValue.r) {
    h = 60 * (0 + (rgbValue.g - rgbValue.b) / (max - min));
  } else if (max === rgbValue.g) {
    h = 60 * (2 + (rgbValue.b - rgbValue.r) / (max - min));
  } else if (max === rgbValue.b) {
    h = 60 * (4 + (rgbValue.r - rgbValue.g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  s *= 100;
  l *= 100;
  //pasted code from Fronter ends here

  //storing our hsl value in a variable, and the toFixed with parameter 0 makes sure that we get a whole number
  let hsl = `${h.toFixed(0)}, ${s.toFixed(0)}, ${l.toFixed(0)}`;

  //here we get our returned values in the variable we just created above
  return hsl;
}

//displaying the color as HSL-values in the info box
function displayHsl(hslValue) {
  document.querySelector("#hsl p").innerHTML = hslValue;
}
