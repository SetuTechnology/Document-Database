const formidable = require('formidable');

module.exports = async (req, res) => {
    // const form = formidable({ multiples: true });
    const form = new formidable.IncomingForm();
    // console.log('form',form);

    console.log('in here');

    form.parse(req);

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    return res.write('sucess');
};


