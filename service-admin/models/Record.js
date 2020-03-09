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
    title: { type: String, initial:true, required: true },
    location: { type: Types.Relationship, ref: 'Location', index: true },
    GDriveLink: { type: Types.Url, required: true, index: true, initial: true}
});

Record.defaultColumns = 'title';
Record.register();
