// 自定义渲染流程
import Core from "./index";
function renderflow(base: Core, curCom: any) {
  const { name } = curCom; // 获取当前的名称
  let curC:any  // 回来改，应该时当权组件的类型
  curC = base.getEntityByName(name); // 获取组件

  return base.useRenderFlow(
    // 这一步是去渲染
    curC,
    curCom.childrens?.map((ele: object) => renderflow(base, ele)),
    curCom
  );
}
export default renderflow;
