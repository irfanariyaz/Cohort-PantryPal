import fs from 'fs';
import stream from 'stream';
import path from 'path';
import Jimp from 'jimp';
const __dirname = path.resolve();

//Takes url and downloads image to temp folder.
//Never EVER do this in a real production facing environment lmao.
//This is only for learning + funsies + convenience.
async function buildImage(url, name) {
    const imagePath = path.join(__dirname, `./pdf/temp/${name}.jpg`);
    const file = fs.createWriteStream(imagePath);

    return await fetch(url).then(async (res) => {
        let pipe = stream.Readable.fromWeb(res.body).pipe(file);

        return await new Promise(resolve => {pipe.on('finish', resolve)});
    }).then(async () => {
        return await Jimp.read(imagePath).then(async (image) => {
            return await image
            .writeAsync(path.join(__dirname, `./pdf/temp/${name}.png`));
        }).catch((error) => {
            console.error(error);
        });
    }).catch((error) => {
        console.error(error);
    });
}

//This was thrown together on a whim. Code does not consider
//possible race conditions but this shouldn't be seriously used
//to begin with. 
function closeImage(name) {
    fs.unlink(path.join(__dirname, `./pdf/temp/${name}.jpg`), () => {
        console.log("success");
    });
}


export default {
    build: buildImage,
    close: closeImage
}