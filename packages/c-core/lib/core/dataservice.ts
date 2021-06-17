// 数据层
class DataService {
  base: Core
  services: Function[]
  constructor(base) {
    this.base = base;
    this.services = [];
  }
  registerService(fn) {
    this.services.push(fn.bind(this.base));
  }
  run(data) {
    const { services } = this
    return services.reduce((pre, next) => next(pre) || pre, data);
  }
}
export default DataService;