function debugPlugin(debug) {
    return debug ? {
        match(node, next) {
            console.log('match Node', node)
            next(node)
        }
    } : ''
}
export default debugPlugin