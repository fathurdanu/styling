import React, { Component } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import generate_style from "./style";

export default class Button extends Component {
  constructor(props) {
    super(props);
    const { type, color, status, size } = this.props;
    const style = generate_style(type, color, status, size);
    this.state = { style };
  }

  componentDidUpdate(prevProps) {
    const { type, color, status, size } = this.props;
    if (
      prevProps.status !== status ||
      prevProps.type !== type ||
      prevProps.color !== color ||
      prevProps.size !== size
    ) {
      const style = generate_style(type, color, status, size);
      this.setState({
        style: style,
      });
    }
  }

  render() {
    const { type, children, status, className } = this.props;
    let { style } = this.state;

    if (className) {
      style = twMerge(style, className);
    }

    return (
      <div {...this.props} className={`${style}`}>
        <div className={`h-full mp-center ${type !== "icon" && "gap-1"}`}>
          {status === "loading" && (
            <AiOutlineLoading3Quarters
              className={`inline-block animate-spin`}
            />
          )}
          {(type !== "icon" || status !== "loading") && children}
        </div>
      </div>
    );
  }
}
