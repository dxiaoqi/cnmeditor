import Entity from './Entity'
import {applyMixins} from '../utils'
class EntityManager {
    Entities: Map<string, Entity[]>
    EntityMap: Map<number, Entity>
    ObjectPool: Map<string, any>
    constructor() {
        this.ObjectPool = new Map<string, any>()
        this.Entities = new Map<string, Entity[]>()
        this.EntityMap = new Map<number, Entity>()

    }
    createEntity(name: string, EntityComponent: any) {
    const _Nentity = applyMixins(EntityComponent, [Entity])
    this.ObjectPool.set(name, _Nentity)
    return _Nentity
    }

    registerEntity(name: string, EntityComponent: Entity) {
        // 实体注册
        const entities = this.Entities.get(name) || []
        this.Entities.set(name, entities.concat([EntityComponent]))
        this.EntityMap.set(EntityComponent.id, EntityComponent)
    }

    getEntityById(id: number) {
        return this.EntityMap.get(id)
    }
    getEnetitiesByName(name: string) {
        return this.Entities.get(name)
    }
    getEntityComponent(name: string) {
        return this.ObjectPool.get(name)
    }
}
export default EntityManager