const excelToJson = require('convert-excel-to-json');

module.exports = async (req, res) => {
    let fileData = req.files.upload; // the uploaded file object
    console.log(fileData);

    if(Array.isArray(fileData)) {
        for (let file in fileData) {
            console.log(fileData[file].originalname);
            return res.json(readFile(fileData[file].path));

        }
    }
    else {
        console.log(fileData.originalname)
        return res.json(readFile(fileData.path));
    }
};

function readFile(filePath){
    const result = excelToJson({
        sourceFile: filePath,
        columnToKey: {
            '*': '{{columnHeader}}'
        }
    });
    return result;
}


