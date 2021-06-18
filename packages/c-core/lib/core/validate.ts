function validate(source: object, schema: object){
    let error = {}
    Object.keys(schema).forEach(function(key){
        let val = source[key]   // 资源
        let type = schema[key]  // 用于检验的
        const mm = typeof type === 'string' ? type : typeof type
        type instanceof Array ? check['_array'](source, key, type, val) :  check[mm](source, key, type, val)

    })
    return error||{sucess:true, result:result}
}

const check = {
    _string: (result, key, type, val) => typeof val === "string",
    _number: (result, key, type, val) => {
        if (typeof val ==="number") return true
        if (!isNaN(parseInt(val))) {
            result[key] = parseInt(val)
            return true
        }
        return false
    },
    _array: (result, key, type, val) => {
        if (val instanceof Array) {
            let val = true
            // if (type.length === 1) 
        }
        return false
    },
    _functions: (result, key, type, val) => type(val)
}