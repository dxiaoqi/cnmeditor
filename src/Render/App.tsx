import Core, {ProxyUpate} from "../core/index";
import React, { ReactComponentElement, useEffect, useState } from "react";
import {ComponentView, View} from '../utils/constant'
import schema from "../schema.json";
import Panel from "../component/panel";
import Pext from "../component/text";
import Button from '../component/button';
// import { eventCore } from "./utils/event";
// SCRIPTS
import Location from '../script/Location'
import Select from "../script/Select"
import './index.css'

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props) {
  const [content, setContent] = useState(<></>)
  const {select, ComponentView, viewStatus} = props
  useEffect(function() {
    const _c = new Core(document.getElementById("root"), {
      renderFlow: (Cur: any, childrens: any[], curCom: any) => {
        // 做更新的逻辑
        const { component = [], path } = curCom
        if (viewStatus === View.VIEW) {
          // 开发状态下，不加载组件，只加载
        }
        if(viewStatus === View.PLAY) {
          // 预览状态下
          component.forEach(componentName => {
            curCom[componentName] = ProxyUpate(curCom[componentName], function(target,key ,value) {
              // 每次变化去更新视图
              const _pa = _c.updateStore(path, componentName, target)
              setContent(_pa)
            })
          })
        }

        return React.createElement(Cur, {
          viewStatus,
          ...curCom,
          childrens
        });
      }
    });
    _c.registerEntity("panel", Panel)
    _c.registerEntity("taxt", Pext)
    _c.registerEntity("button", Button)
    _c.registeredComponent(Location)
    _c.registeredComponent(Select)
    const Pa = _c.loadSchema(schema as any)
    setContent(Pa)
  }, [1])
  return content
}
