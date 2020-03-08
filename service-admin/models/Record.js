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
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    location: { type: Types.Relationship, ref: 'Location', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
});

Record.defaultColumns = 'title';
Record.register();