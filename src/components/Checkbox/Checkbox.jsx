import React, { Component } from "react";
import generate_style from "./style";

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    const { type, color, size, checked } = this.props;
    const { font_size, comp_height, bg_color } = generate_style(
      type,
      color,
      size
    );

    this.state = {
      checked: checked || false,
      font_size,
      comp_height,
      bg_color,
    };
  }

  componentDidUpdate(prevProps) {
    const { type, color, size, checked, onChange } = this.props;
    if (
      prevProps.type !== type ||
      prevProps.color !== color ||
      prevProps.size !== size ||
      prevProps.checked !== checked
    ) {
      const { font_size, comp_height, bg_color } = generate_style(
        type,
        color,
        size
      );
      this.setState({
        font_size,
        comp_height,
        bg_color,
      });
    }

    if (prevProps.checked !== checked) {
      onChange();
    }
  }

  render() {
    const { label, type, checked, id, ...props } = this.props;
    const { font_size, comp_height, bg_color } = this.state;
    let type_content = <div></div>;
    if (type === "checkbox" || !type) {
      type_content = (
        <div className="flex items-center mb-4">
          <input
            {...props}
            id={id}
            type="checkbox"
            className={`${comp_height} ${bg_color}`}
          />
          <label
            htmlFor={id}
            className="ml-2 text-sm font-medium text-neutral-black"
          >
            {label}
          </label>
        </div>
      );
    } else if (type === "toggle") {
      type_content = (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            {...props}
            id={id}
            type="checkbox"
            value=""
            className="sr-only peer "
          />
          <div
            className={`${bg_color} ${comp_height} peer-focus:ring-offset-2 bg-neutral-dark-grey border`}
          ></div>
          <label
            htmlFor={id}
            className={`ml-3 ${font_size} text-neutral-black`}
          >
            {label}
          </label>
        </label>
      );
    }

    return <div>{type_content}</div>;
  }
}
