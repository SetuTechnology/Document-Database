const excelToJson = require('convert-excel-to-json');
const keystone = require('keystone');

module.exports = async (req, res) => {
    // console.log('here');
    // console.log('>>>>>>>>>>>>>>>>',req);
    // let str = req.url.split('/');
    // let exampleId = str.pop() || str.pop();
    // if(exampleId!=='fileUpload') return res.send('404');

    let fileData = req.files.files; // the uploaded file object
    console.log('>>>>>',fileData);
    if(!fileData) return 'no file uploaded';
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
    console.log('loc',loc);
    let today = new Date();
    let Record = keystone.list('Record').model;
    for(let sheet in results){
        // console.log('>>>>>>>>',sheet);
        for(let records in results[sheet]){
            let record = new Record({
                ReportName: results[sheet][records]['REPORT NAME']==='n/a' ? null: results[sheet][records]['REPORT NAME'],
                InsuranceDate: results[sheet][records]['ISSUANCE DATE']==='n/a' ? null: results[sheet][records]['ISSUANCE DATE'],
                ExpiryDate: results[sheet][records]['EXPIRY DATE']==='n/a' ? null: results[sheet][records]['EXPIRY DATE'],
                FrequencyOfRenewal: results[sheet][records]['FREQUENCY OF  RENEWAL']==='n/a' ? null: results[sheet][records]['FREQUENCY OF  RENEWAL'],
                DeadLineForRenewal: results[sheet][records]['DEADLINE FOR  RENEWAL']==='n/a' ? null: results[sheet][records]['DEADLINE FOR  RENEWAL'],
                Regulator: results[sheet][records]['REGULATOR']==='n/a' ? null: results[sheet][records]['REGULATOR'],
                ReportProcessor: results[sheet][records]['REPORT PROCESSOR']==='n/a' ? null: results[sheet][records]['REPORT PROCESSOR'],
                ContactNo: results[sheet][records]['CONTACT NO.']==='n/a' ? null: results[sheet][records]['CONTACT NO.'],
                EmailAddress: results[sheet][records]['EMAIL ADDRESS']==='n/a' ? null: results[sheet][records]['EMAIL ADDRESS'],
                ImmediateSuperior: results[sheet][records]['IMMEDIATE SUPERIOR']==='n/a' ? null: results[sheet][records]['IMMEDIATE SUPERIOR'],
                EmailAddress2: results[sheet][records]['EMAIL ADDRESS 2']==='n/a' ? null: results[sheet][records]['EMAIL ADDRESS 2'],
                ReportOwner: results[sheet][records]['REPORT OWNER']==='n/a' ? null: results[sheet][records]['REPORT OWNER'],
                ContactNo2: results[sheet][records]['CONTACT NO. 2']==='n/a' ? null: results[sheet][records]['CONTACT NO. 2'],
                EmailAddress3: results[sheet][records]['EMAIL ADDRESS 3']==='n/a' ? null: results[sheet][records]['EMAIL ADDRESS 3'],
                ImmediateSuperior2: results[sheet][records]['IMMEDIATE SUPERIOR 2']==='n/a' ? null: results[sheet][records]['IMMEDIATE SUPERIOR 2'],
                EmailAddress4: results[sheet][records]['EMAIL ADDRESS 4']==='n/a' ? null: results[sheet][records]['EMAIL ADDRESS 4'],
                Status: results[sheet][records]['STATUS']==='n/a' ? null: results[sheet][records]['STATUS'],
                Ageing: results[sheet][records]['AGEING']==='n/a' ? null: results[sheet][records]['AGEING'],
                OngoingProcessDeadline: results[sheet][records]['ONGOING PROCESS  DATE DEADLINE']==='n/a' ? null: results[sheet][records]['ONGOING PROCESS  DATE DEADLINE'],
                Remarks: results[sheet][records]['REMARKS']==='n/a' ? null: results[sheet][records]['REMARKS'],
                location: await loc,
            });
            await record.save().catch(console.error);
        }
    }

     return 0;
}


