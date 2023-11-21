const axios = require('axios');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const parseFolder = require("./fontSizeArrayObject");

const ttfDatasArray = parseFolder('./ttf-fonts');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ttfConvertToFnt = async (ttfDatas, type) => {
  const ttfArray = type === 'array' ? ttfDatas : Object.values(ttfDatas);

  for (const ttfData of ttfArray) {
    await delay(100);
    await downloadAndSaveFonts(ttfData);
  }
};

const downloadAndSaveFonts = async (ttfData) => {
  const { url, size } = ttfData;

  try {
    const response = await axios.post('https://ttf2fnt.com/convert', {
      filename: fs.createReadStream(url),
      fontSize: size,
    }, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const outputFolder = path.join(__dirname, 'output');

    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }

    const zip = new AdmZip(response.data);
    const zipEntries = zip.getEntries();

    zipEntries.forEach((entry) => {
      if (entry.name.endsWith('.png') || entry.name.endsWith('.fnt')) {
        const entryPath = path.join(outputFolder, `${path.basename(url, '.ttf')}${size}.${entry.name.split('.').pop()}`);
        fs.writeFileSync(entryPath, entry.getData());

        if (entry.name.endsWith('.fnt')) {
          const fntContent = fs.readFileSync(entryPath, 'utf8');
          const updatedFntContent = fntContent.replace(/file=".*?"/, ` file="${path.basename(url, '.ttf')}${size}.png"`);
          fs.writeFileSync(entryPath, updatedFntContent);
        }

      }
    });

    console.log('Başarıyla dönüştürüldü ve kaydedildi:', url);
  } catch (error) {
    console.log('Hata:', error.message);
  }
};

const runConversion = async () => {
  try {
    await ttfConvertToFnt(ttfDatasArray, 'array');
  } catch (error) {
    console.log(`Hata oluştu: ${url} error: ${error.message}`);
  }
};

runConversion();
