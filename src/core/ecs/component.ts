import { hashCode } from '../utils'
export type ComponentSchemaProp = {
    default?: any;
    type: any
  
};
export type ComponentSchema = {
    [propName: string]: ComponentSchemaProp;
};
export type Properties = {
    [propName: string]: any;
};
class Component {
    static schema: ComponentSchema;
    [propname: string]: any;
    constructor(props:Properties) {
        const _name = (this.constructor as any).name
        if (typeof _name !== 'string') {
            console.error('name must a string', _name)
            return
        }
        let typeId = hashCode(_name)
        this.componentId = typeId
        this.name = _name
        if (!props === false) {
            // // 说明是个对象
            const schema  = (this.constructor as any).schema
            //console.log((this.constructor as any).schema)
            for (const key in schema) {
                if (props && props.hasOwnProperty(key)) {
                    // 如果有这个属性
                    // this[key] = this.updateProp(props, key) // props[key]
                } else {
                    if (schema[key].hasOwnProperty('default')) {
                        props[key] = schema[key].default
                        // this[key] = this.updateProp(props, key)
                    } else {
                        props[key] = schema[key]
                        // this[key] = this.updateProp(props, key)
                    }
                }
            }
            this.schema = this.updateProp(props, (key ,value) => {
                props[key] = value
            })
        }
    }

    updateProp(data, cb) {
        // 作为传入实例的代理，用于更新上层代理
        return new Proxy(data, {
            get(target, key) {
                return Reflect.get(target, key)
              },
            set: (target, key, value) => {
                // 代理更新了
                // console.log('代理更新了, 同步到上层')
                cb(key ,value)
                return Reflect.set(target, key , value)
            }
        })
    }
    clone() {
        return new (this.constructor as any)().copy(this);
      }
}
export default Component;