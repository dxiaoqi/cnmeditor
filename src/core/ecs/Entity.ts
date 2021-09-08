import Component from './component';
import { _EntityManager, _ComponentManager} from './index'
import { randomID, applyMixins } from '../utils'
interface components  {
    [name: string]: Component
}
type searchComponent = Component | string
class Entity {
    public id: number
    public name: string
    private components: components
    private numStateComponents: number
    props: any; // 没啥用
    init(name: string) {
        this.id = randomID()
        this.name = name
        this.components = {}
        // 注册到管理
        _EntityManager.registerEntity(name, this)
        this.numStateComponents = 0
    }

    addComponent(name: string, schema: object) {
        // 实例化组件
        const _Component = _ComponentManager.getComponent(name)
        let InstanceComponent = new (_Component as any)(schema)
        // 这里改造成id，通过id在manager那里去查
        InstanceComponent.entity = this.id
        this.components[_Component.name] = InstanceComponent
    }

    removeComponent(Component: searchComponent) {
        // 移除组件
        if (typeof Component === 'string') {
            delete this.components[Component]
        } else {
            delete this.components[Component.name]
        }
    }

    hasComponent(Component: searchComponent) {
        // 判断是否存在
        if (typeof Component === 'string') {
            return !!this.components[Component]
        } else {
            return !!this.components[Component.name]
        }
    }

    getComponent(Component: searchComponent) {
        // 获取组件的实例
        if (typeof Component === 'string') {
            return this.components[Component]
        } else {
            return this.components[Component.name]
        }
    }

    getComponents() {
        return Object.values(this.components)
    }
}
export default Entity