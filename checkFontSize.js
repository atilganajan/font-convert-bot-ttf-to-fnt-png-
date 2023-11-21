const fs = require("fs");


const getFntArray = () => {

  const files = fs.readdirSync("./fnt-png-fonts"); // path 

  const fntArray = [];

  for (const [index, file] of files.entries()) {

    const isFnt = file.split(".fnt");

    if (isFnt.length == 2) {
      fntArray.push(file)
    }

  }

  return fntArray;

} // 3476

const getNewFntArray = () => {

  const fonts = getFntArray();

  console.log(fonts.length)
  const newFntArray = [];

  for (const [index, font] of fonts.entries()) {


    let last6 = font.slice(-6);
  
 
    let fontName = font.split(last6);

    newFntArray[fontName[0]] = newFntArray[fontName[0]] ?? [];

    newFntArray[fontName[0]].push(font);

  }

  return newFntArray;

}



const checkFntFontSizes = () => {
  let fonts = getNewFntArray();

  let missingFonts = [];

  fonts = Object.assign({}, fonts)

  for (const key in fonts) {

    if (fonts[key].length != 11) {

     let last6 =  fonts[key][0].slice(-6);
     let  fontName = fonts[key][0].split(last6);
     fontName = fontName[0];
     fontName += ".fnt";

     console.log( fontName)
    }

  }

}

checkFntFontSizes();