// 定一个抽象类
abstract class Action {
    abstract init(): void;
    abstract update(): void;
}

export default Action