const fs = require('fs');

const ttfDatasArray = [];

const parseFolder =( folderPath)=>{
    const files = fs.readdirSync(folderPath);
    const sizes = ['12', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];

    for (const file of files) {
        sizes.forEach(size => {
            ttfDatasArray.push({
                url:folderPath+"/"+file,
                size: size
            });
        });
    }
        return ttfDatasArray;
}

module.exports = parseFolder;

/* parseFolder('./ttf-fonts'); */