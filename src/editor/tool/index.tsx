import React from 'react'
import { SelectionIcon, Rect, Pen } from '../source/icon'
type ComponentProps = {}
export default class Editor extends React.Component<ComponentProps | any, any> {
    constructor(props: ComponentProps | any) {
        super(props)
        this.state = {
            name: '',
            componentList: {}
        }       
    }

    render() {
        const {name, componentList} = this.state
        return (
            <div className="tool-bar">
            <div className="left">
              <button className="icon-button">
                <SelectionIcon />
              </button>
              <button className="icon-button">
                <Rect />
              </button>
              <button className="icon-button">
                <Pen />
              </button>
            </div>
            <div className="right">
              <button className="icon-button">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 1C7.26801 1 1 7.26801 1 15C1 22.732 7.26801 29 15 29C22.732 29 29 22.732 29 15C29 11.4494 27.6783 8.20758 25.5 5.73961"
                    stroke="url(#paint0_angular)"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <circle cx="14.9995" cy="15" r="11" fill="url(#pattern0)" />
                  <defs>
                    <pattern
                      id="pattern0"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                    </pattern>
                    <radialGradient
                      id="paint0_angular"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(15 15) rotate(-67.8906) scale(15.1112)"
                    >
                      <stop stop-color="#24FFFF" />
                      <stop offset="1" stop-color="#7720FF" />
                    </radialGradient>
                    <image
                      id="image0"
                      width="320"
                      height="320"
                    />
                  </defs>
                </svg>
              </button>
              <button className="icon-button">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="14" cy="14" r="14" fill="#1ABDFF" />
                  <path
                    d="M14.8 15.875C11.16 15.875 8.08333 17.9583 7 19C7.65 13.375 12.4167 12.125 14.8 11.5V9L20 14L14.8 18.375V15.875Z"
                    fill="white"
                  />
                </svg>
                </button>  
            </div>
        </div>
        )
    }
}