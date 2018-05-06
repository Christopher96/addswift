module.exports = (schema) => {
    schema.statics.populateAll = () => {
        let paths = ''
        schema.eachPath((pathname, schemaType) => {
            if (pathname=='_id') return

            const type = schemaType.constructor.name
            if (type == 'ObjectId' || type == 'SchemaArray')
                paths += ' ' + pathname

        })

        return paths            
    }
}

