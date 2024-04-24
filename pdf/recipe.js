import PDFDocument from 'pdfkit';
import getRecipe from './controllers/getRecipe.js';
import buildImage from './controllers/getImage.js';
import path from 'path';
const __dirname = path.resolve();

//Takes recipe data and writes a PDF to HTTP Response.
async function createRecipe(req, res) {
    const doc = new PDFDocument();
    const recipe = await getRecipe(req, res).catch((error) => {
        console.error(error);
    });

    if (typeof recipe !== "null" || typeof recipe !== "undefined") {
        const name = recipe.name;
        await buildImage.build(recipe.image, name).catch((error) => {
            console.error(error);
            res.status(500).send(error);
        });
        
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=${name}.pdf`
        });
    
        doc.pipe(res);
    
        doc.font('Helvetica-Bold')
            .fontSize(23)
            .text(name);
        
        doc.image(
            path.join(__dirname, `/pdf/temp/${name}.png`),
            {scale: 0.25}
        );

        doc.font('Helvetica-Bold')
            .fontSize(18)
            .text("Ingredients", 75, 290);

        doc.font('Times-Roman')
            .fontSize(10)
            .list(recipe.ingredientNames, 75, 320);

        doc.font('Helvetica-Bold')
            .fontSize(18)
            .text("Instructions", 300, 290)

        doc.font('Times-Roman')
            .fontSize(9)
            .list(recipe.instructions, 300, 320);
        
        //buildImage.close(recipe.name);
        doc.end();
    } else {
        res.status(404).send();
    }
}

export default createRecipe;