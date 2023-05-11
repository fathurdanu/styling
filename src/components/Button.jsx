import React, { Component } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default class Button extends Component {
  constructor(props) {
    super(props);
    const { type, color, status } = this.props;
    const style = this.generate_style(type, color, status);
    console.log(style);
    this.state = { style };
  }

  componentDidUpdate(prevProps) {
    const { type, color, status } = this.props;
    if (
      prevProps.status !== status ||
      prevProps.type !== type ||
      prevProps.color !== color
    ) {
      const style = this.generate_style(type, color, status);
      this.setState({
        style,
      });
    }
  }

  generate_style = (type, color, status) => {
    let style = `mp-button-${type}-${color}`;
    if (type && status) {
      style += ` mp-button-${type}`;
    }

    if (status) {
      if (status !== "loading" && status !== "disable") {
        if (color) {
          style += `-${color}`;
        }
        style += `-${status}`;
      } else {
        style += `-disable`;
      }
    }

    return style;
  };

  render() {
    const { children, status } = this.props;
    const { style } = this.state;
    return (
      <div {...this.props} className={style}>
        {status === "loading" && (
          <AiOutlineLoading3Quarters className="inline-block animate-spin mr-2" />
        )}
        {children}
      </div>
    );
  }
}
