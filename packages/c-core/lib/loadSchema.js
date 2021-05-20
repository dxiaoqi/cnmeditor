const schema = require('./schema.json')
function loadSchema(options) {
    return {
        init(arg, next) {
            next(schema.dom)
        },
        load(arg, next) {
            console.log(arg)
        }
    }
}
module.exports = loadSchema