/*
 * Adds the modified field to schemas
 */

module.exports = (schema, options) => {
    schema.add({ modified: Date });

    schema.pre('save', (next) => {
        this.modified = new Date();
        next();
    });

    if (options && options.index) {
        schema.path('modified').index(options.index);
    }
}