/* eslint-disable */
import React, { Component } from "react";
import wrap from "../wrap";
import "./style/index.less";
@wrap
export default class Panel extends Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { props } = this;
    return <div className="full-card">{(props as any)?.childrens}</div>;
  }
}
