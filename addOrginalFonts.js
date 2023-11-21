const fs = require("fs");


const getFntArray = () => {

    const files = fs.readdirSync("./output"); // path 
  
    const fntArray = [];
  
    for (const [index, file] of files.entries()) {
  
      const isFnt = file.split(".fnt");
  
      if (isFnt.length == 2) {
        fntArray.push(file)
      }
  
    }
  
    return fntArray;
  
  }


  const getNewFntArray = () => {

    const fonts = getFntArray();
  
    const newTtfArray = [];
  
    for (const [index, font] of fonts.entries()) {
  
  
      let last6 = font.slice(-6);
    
   
      let fontName = font.split(last6);
          fontName = fontName[0] +".ttf"  
      
          if (!newTtfArray.includes(fontName)) {
            newTtfArray.push(fontName);
          }
    }
 
    return newTtfArray;
  
  }


  const moveOldToNew = () =>{

        const outputArray = getNewFntArray();

        for(const oldFile of outputArray){
            let oldPath = `./ttf-fonts/${oldFile}`;
            let newPath = `./output/${oldFile}`;

            fs.rename(oldPath, newPath, function (err) {
                if (err) throw err
                console.log('Successfully renamed - AKA moved!')
              });


        }

  }


  moveOldToNew();
