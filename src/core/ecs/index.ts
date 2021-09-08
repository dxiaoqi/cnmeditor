import EntityManager from './entityManager'
import ComponentManager from './componentManager'
export const _EntityManager = new EntityManager()
export const _ComponentManager = new ComponentManager()
// 一个系统里，共用预制体
class ECS {
    ComponentsManager: ComponentManager
    EntityManager: EntityManager
    constructor() {
        this.ComponentsManager = _ComponentManager;
        this.EntityManager = _EntityManager
    }
    registerComponent(Component: any){
        this.ComponentsManager.registerComponen(Component);
    }
    createEntity(name: string, EntityComponent) {
        return this.EntityManager.createEntity(name, EntityComponent);
    }
    getEntityByName(name: string) {
        return this.EntityManager.getEnetitiesByName(name)
    }
    getEntityComponent(name: string) {
        return this.EntityManager.getEntityComponent(name)
    }
}
export default ECS;