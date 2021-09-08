
const context = require.context('./', true, /\.tsx$/)
let map = {}
context.keys().forEach(e => {
    const name = e.split('/')[1]
    map[name] = context(e).default
})
export default map