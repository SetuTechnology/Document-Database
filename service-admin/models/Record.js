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
    ReportName: { type: String, initial:true },
    InsuranceDate: { type: Types.Date, initial:true },
    ExpiryDate: { type: Types.Date, initial:true },
    FrequencyOfRenewal: { type: String, initial:true },
    DeadlineOfRenewal: { type: String, initial:true },
    Regulator: { type: String },
    ReportProcessor: { type: String },
    ContactNo: { type: Types.Number },
    EmailAddress: { type: Types.Email },
    ImmediateSuperior: { type: String },
    EmailAddress2: { type: Types.Email },
    ReportOwner: { type: String },
    ContactNo2: { type: Types.Number },
    EmailAddress3: { type: Types.Email },
    ImmediateSuperior2: { type: String },
    EmailAddress4: { type: Types.Email },
    Status: { type: String },
    Ageing: { type: Types.Number },
    OngoingProcessDeadline: { type: String },
    Remarks: { type: String },
    location: { type: Types.Relationship, ref: 'Location' , initial:true, required:true},
    GDriveLink: { type: Types.Url, index:true }
});


Record.defaultColumns = 'ReportName, InsuranceDate, location,';
Record.register();
