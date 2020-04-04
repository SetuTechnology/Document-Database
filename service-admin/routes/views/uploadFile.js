const excelToJson = require('convert-excel-to-json');
const keystone = require('keystone');

module.exports = async (req, res) => {
    // console.log('here');
    // console.log('>>>>>>>>>>>>>>>>',req);
    // let str = req.url.split('/');
    // let exampleId = str.pop() || str.pop();
    // if(exampleId!=='fileUpload') return res.send('404');

    let fileData = req.files.files; // the uploaded file object
    // console.log('>>>>>',fileData);
    if(!fileData) res.redirect('/fileupload');
    let result = 2;

    if(Array.isArray(fileData)) {
        for (let file in fileData) {
            console.log(fileData[file].originalname);
            result = await readFile(fileData[file]);

        }
    }
    else {
        console.log(fileData.originalname)
        result = await readFile(fileData);
    }
    console.log('result ', result);
    if(result !==0)
        res.end('please check the uploaded file and try again');
    res.redirect('/');

};

async function readFile(file){
    const results = excelToJson({
        sourceFile: file.path,
        header:{
            // Is the number of rows that will be skipped and will not be present at our result object. Counting from top to bottom
            rows: 1 // 2, 3, 4, etc.
        },
        columnToKey: {
            '*': '{{columnHeader}}'
        }
    });
    if(file.extension !== 'xls' && file.extension !== 'xlsx')
        return -1;
    let locName = file.originalname.substring(0, file.originalname.lastIndexOf(".") );
    let Location = keystone.list('Location').model;
    let isLocationCreated = await Location.findOne({name: locName}).catch(err => {console.log(err)});
    if(!isLocationCreated){
        let location = new Location({
            name: locName,
        });
        await location.save().catch(console.error);
    }
    let loc =  await Location.findOne({name: locName}).catch(err => {console.log(err)});
    let gdriveLink = loc.GDriveLink;
    // console.log('loc',loc);
    // let today = new Date();
    let Record = keystone.list('Record').model;
    for(let sheet in results){
        // console.log('>>>>>>>>',sheet);

        for(let records in results[sheet]) {

            // let record = {};
            // record = Object.assign(record, record._doc);
            // delete record._id;
            let record = await Record.findOne({ReportName: results[sheet][records]['DOCUMENT']}).catch(err => {
                console.log(err)
            });
            if (record) {
                console.log('record?????????', record);
                Record.findOneAndUpdate({ReportName: results[sheet][records]['DOCUMENT']}, record, {upsert: true}, function (err) {
                    if (err)
                        return console.log(err);
                    console.log('record updated');
                });
            } else {
                let record = new Record({
                    Document: results[sheet][records]['DOCUMENT'] === 'n/a' ? null : results[sheet][records]['DOCUMENT'],
                    InsuranceDate: results[sheet][records]['ISSUANCE DATE'] === 'n/a' ? null : results[sheet][records]['ISSUANCE DATE'],
                    ExpiryDate: results[sheet][records]['EXPIRY DATE'] === 'n/a' ? null : results[sheet][records]['EXPIRY DATE'],
                    FrequencyOfRenewal: results[sheet][records]['FREQUENCY OF  RENEWAL'] === 'n/a' ? null : results[sheet][records]['FREQUENCY OF  RENEWAL'],
                    DeadLineForRenewal: results[sheet][records]['DEADLINE FOR  RENEWAL'] === 'n/a' ? null : results[sheet][records]['DEADLINE FOR  RENEWAL'],
                    RenewalDate : results[sheet][records]['RENEWAL Date'] === 'n/a' ? null : results[sheet][records]['RENEWAL Date'],
                    Agency: results[sheet][records]['AGENCY'] === 'n/a' ? null : results[sheet][records]['AGENCY'],
                    Address: results[sheet][records]['ADDRESS'] === 'n/a' ? null : results[sheet][records]['ADDRESS'],
                    AgencyContactNo: results[sheet][records]["AGENCY'S CONTACT NO."] === 'n/a' ? null : results[sheet][records]["AGENCY'S CONTACT NO."],
                    Function: results[sheet][records]['FUNCTION'] === 'n/a' ? null : results[sheet][records]['FUNCTION'],
                    Processor: results[sheet][records]['PROCESSOR'] === 'n/a' ? null : results[sheet][records]['PROCESSOR'],
                    ProcessorContactNo: results[sheet][records]["PROCESSOR'S CONTACT NO."] === 'n/a' ? null : results[sheet][records]["PROCESSOR'S CONTACT NO."],
                    ProcessorEmailAddress: results[sheet][records]["PROCESSOR'S EMAIL ADDRESS"] === 'n/a' ? null : results[sheet][records]["PROCESSOR'S EMAIL ADDRESS"],
                    ProcessorIMEmailAddress: results[sheet][records]["PROCESSOR'S IM'S EMAIL ADDRESS"] === 'n/a' ? null : results[sheet][records]["PROCESSOR'S IM'S EMAIL ADDRESS"],
                    // EmailAddress2: results[sheet][records]['EMAIL ADDRESS 2'] === 'n/a' ? null : results[sheet][records]['EMAIL ADDRESS 2'],
                    Owner: results[sheet][records]['OWNER'] === 'n/a' ? null : results[sheet][records]['OWNER'],
                    OwnerContactNo: results[sheet][records]["OWNER'S CONTACT NO."] === 'n/a' ? null : results[sheet][records]["OWNER'S CONTACT NO. 2"],
                    OwnerEmailAddress: results[sheet][records]["OWNER'S EMAIL ADDRESS"] === 'n/a' ? null : results[sheet][records]["OWNER'S EMAIL ADDRESS"],
                    OwnerImmediateSuperior: results[sheet][records]["OWNER'S IMMEDIATE SUPERIOR 2"] === 'n/a' ? null : results[sheet][records]["OWNER'S IMMEDIATE SUPERIOR"],
                    OwnerImEmailAddress: results[sheet][records]["OWNER'S IM'S EMAIL ADDRESS"] === 'n/a' ? null : results[sheet][records]["OWNER'S IM'S EMAIL ADDRESS"],
                    Status: results[sheet][records]['STATUS'] === 'n/a' ? null : results[sheet][records]['STATUS'],
                    Ageing: results[sheet][records]['AGEING'] === 'n/a' ? null : results[sheet][records]['AGEING'],
                    OngoingProcessDeadline: results[sheet][records]['ONGOING PROCESS  DATE DEADLINE'] === 'n/a' ? null : results[sheet][records]['ONGOING PROCESS  DATE DEADLINE'],
                    Remarks: results[sheet][records]['REMARKS'] === 'n/a' ? null : results[sheet][records]['REMARKS'],
                    location: await loc._id,
                    GDriveLink: gdriveLink,
                });
                await record.save((err)=>{console.log(err)});
            }
        }
    }

     return 0;
}


