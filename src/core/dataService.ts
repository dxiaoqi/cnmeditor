
// 数据层
class DataService {
  base: any;
  services: Function[];
  constructor(base: any) {
    this.base = base;
    this.services = [];
  }
  registerService(fn: Function): void {
    this.services.push(fn.bind(this.base));
  }
  run(data: object) {
    const { services } = this;
    return services.reduce((pre, next) => next(pre) || pre, data);
  }
}
export default DataService;
