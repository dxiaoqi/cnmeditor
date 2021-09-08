/* eslint-disable */
import React, { Component } from "react";
import wrap from "../wrap";
@wrap
export default class Button extends Component {
  // constructor(props: any) {
  //   super(props);
  // }
  componentDidMount() {
    console.log((this as any).__proto__)
  }
  render() {
    const { props } = this;
    return <div className="button raised blue">
      <div className="center">{(props as any)?.value}</div>
    </div>;
  }
}
