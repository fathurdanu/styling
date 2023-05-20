import React, { Component } from "react";
import { twMerge } from "tailwind-merge";
import generate_style from "./style";

export default class Textfield extends Component {
  constructor(props) {
    super(props);
    const { color, size, icon } = this.props;
    const { style, margin, icon_color } = generate_style(color, size, icon);
    this.state = { style, margin, icon_color };
  }

  componentDidUpdate(prevProps) {
    const { color, size, icon } = this.props;
    if (
      prevProps.color !== color ||
      prevProps.size !== size ||
      prevProps.icon !== icon
    ) {
      const { style, margin, icon_color } = generate_style(color, size, icon);
      this.setState({
        style,
        margin,
        icon_color,
      });
    }
  }

  render() {
    const { children, className, icon, color, size, ...props } = this.props;
    const { style, margin, icon_color } = this.state;

    return (
      <div className={`h-fit flex items-center rounded-[8px]`}>
        {icon && (
          <div className={`absolute ${margin} pointer-events-none`}>
            <p className={twMerge(icon_color, className)}>{icon}</p>
          </div>
        )}
        <input {...props} type="text" className={`${style} ${className}`} />
      </div>
    );
  }
}
