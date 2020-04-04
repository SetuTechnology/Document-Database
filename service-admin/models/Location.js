const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Test Model
 * ==========
 */
const Location = new keystone.List('Location', {
    track: true,
});

Location.add({
    name: { type: String, required: true, index: true, initial: true },
    GDriveLink: {type: Types.Url , index: true, },
});


/**
 * Relationships
 */
Location.relationship({ ref: 'Record', path: 'record', refPath: 'location' });

/**
 * Registration
 */
Location.defaultColumns = 'name';
Location.register();

Location.model.schema.pre('save',async function (next) {
    if(this.GDriveLink){
        let Record = keystone.list('Record').model;
        await Record.update({location:this._id}, { GDriveLink: this.GDriveLink }, { multi: true }, function(err, res) {
            if (err) {
                console.log(err);
            }
        });
    }
    next();
});

Location.model.schema.pre('remove', async function(next){
    console.log('before remove');
    let Record = keystone.list('Record').model;
    await Record.remove({_id: this.name}).catch(err => {console.log(err)});
    next();
})