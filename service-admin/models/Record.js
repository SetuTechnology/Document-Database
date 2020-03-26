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
    Document: { type: String, initial:true, index:true },
    InsuranceDate: { type: Types.Date, initial:true },
    ExpiryDate: { type: Types.Date, initial:true },
    FrequencyOfRenewal: { type: String, initial:true },
    DeadlineOfRenewal: { type: String, initial:true },
    RenewalDate: { type: Types.Date, initial:true },
    Agency: { type: String },
    Address: { type: String },
    AgencyContactNo: { type: Types.Number },
    Function: { type: String },
    Processor: { type: String },
    ProcessorContactNo: { type: Types.Number },
    ProcessorEmailAddress: { type: Types.Email },
    ProcessorImmediateSuperior: { type: String },
    ProcessorIMEmailAddress: { type: Types.Email },
    Owner: { type: String },
    OwnerContactNo: { type: Types.Number },
    OwnerEmailAddress: { type: Types.Email },
    OwnerImmediateSuperior: { type: String },
    OwnerImEmailAddress: { type: Types.Email },
    Status: { type: String },
    Ageing: { type: Types.Number },
    OngoingProcessDeadline: { type: String },
    Remarks: { type: String },
    location: { type: Types.Relationship, ref: 'Location' , initial:true, required:true},
    GDriveLink: { type: Types.Url, index:true }
});


Record.defaultColumns = 'Document, InsuranceDate, location,';
Record.register();

Record.model.schema.pre('save', async function(next){
    if(!this.GDriveLink) {
        let Location = keystone.list('Location').model;
        let location = await Location.findOne({_id: this.location}).catch(err => {console.log(err)});

        if(location){
            this.GDriveLink = location.GDriveLink;
        }
    }
    next();
});