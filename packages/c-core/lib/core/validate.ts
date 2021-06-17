function validate(source: object, schema: object){
    let error = {}
    Object.keys(schema).forEach(function(key){
        let val = source[key]   // 资源
        let type = schema[key]  // 用于检验的
        const mm = typeof type === 'string' ? type : typeof type
        type instanceof Array ? check['_array'](source, key, type, val) :  check[mm](source, key, type, val)

        // if(type === "string"){
        //     if(typeof val ==="string"){
        //         result[key] = val
        //     }else{
        //         error = {success:false, message:val+" is not a string."}
        //     }
        // }else if(type === "number"){
        //     if(typeof val ==="number"){
        //         result[key] = val
        //     }else if (!isNaN(parseInt(val))){
        //         result[key] = parseInt(val)
        //     }else{
        //         error = {success:false, message:val+" is not a number."}
        //     }
        // }else if (type.constructor === Array){
        //     if(val.constructor === Array){
        //         var arr_type = type[0]
        //         var valid = true
        //         val.forEach(function(mem){
        //             if(typeof mem !==arr_type){valid = false}
        //         })
        //         if(valid){
        //             result[key] = val
        //         }else{
        //             error = {success:false, message:val+" is not a "+ arr_type+" array."}
        //         }
        //     }else{
        //         error = {success:false, message:val+" is not an array."}
        //     }
        // }else if (typeof type === "function"){
        //     if(type(val)){
        //          result[key] = val
        //     }else{
        //         error = {success:false, message:"Custom validation "+type+ " returned false for "+val+"."}
        //     }
        // }
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