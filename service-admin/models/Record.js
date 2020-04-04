const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Record Model
 * ==========
 */

const Record = new keystone.List('Record', {
    track: true,
});

Record.add({
    location: { type: Types.Relationship, ref: 'Location' , initial:true, required:true},
    Document: { type: String, initial:true, index:true },
    InsuranceDate: { type: Types.Date, initial:true },
    ExpiryDate: { type: Types.Date, initial:true },
    FrequencyOfRenewal: { type: String, initial:true },
    DeadlineOfRenewal: { type: String, initial:true },
    RenewalDate: { type: Types.Date, initial:true },
    Agency: { type: String },
    Address: { type: String },
    AgencyContactNo: {label:"Agency's Contact No.", type: Types.Number },
    Function: { type: String },
    Processor: { type: String },
    ProcessorContactNo: { label:"Processor's Contact No.", type: Types.Number },
    ProcessorEmailAddress: { label:"Processor's Email Address", type: Types.Email },
    ProcessorImmediateSuperior: { label:"Processor's Immediate Superior", type: String },
    ProcessorIMEmailAddress: { label:"Processor's IS' Email Adress", type: Types.Email },
    Owner: { type: String },
    OwnerContactNo: { label:"Owner's Contact No.", type: Types.Number },
    OwnerEmailAddress: { label:"Owner's Email Adress", type: Types.Email },
    OwnerImmediateSuperior: { label:"Owner's Immediate Superior", type: String },
    OwnerImEmailAddress: { label:"Owner's IS' Email Adress", type: Types.Email },
    Status: { type: String },
    Ageing: { type: Types.Number },
    OngoingProcessDeadline: { type: String },
    Remarks: { type: String },
    GDriveLink: { label:"Scan Repository", type: Types.Url, index:true }
});


Record.defaultColumns = 'location, Document, ExpiryDate, RenewalDate, Agency, Status';
Record.register();

Record.model.schema.pre('save', async function(next){
    console.log('>>>');
    let Location = keystone.list('Location').model;
    let location = await Location.findOne({location: this._id}).catch(err => {console.log(err)});

    if(location){
        this.GDriveLink = location.GDriveLink;
    }

    next();
});

