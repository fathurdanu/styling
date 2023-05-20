import React, { Component } from "react";
import { twMerge } from "tailwind-merge";
import Textfield from "../Textfield";
import { BsSearch } from "react-icons/bs";
import generateTailwind from "./style";

const Icon = () => {
  return (
    <svg
      className="w-4 h-4 inline"
      aria-hidden="true"
      fill="currentColor"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg
      className="w-4 h-4 inline"
      aria-hidden="true"
      fill="currentColor"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
    </svg>
  );
};

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    const { type, color, size, direction, value, children } = this.props;
    const {
      style,
      icon_color,
      bg_color,
      font_size,
      comp_height,
      popup_direction,
    } = generateTailwind(type, color, size, direction);
    this.state = {
      filter_text: "",
      filtered_children: children,
      style,
      icon_color,
      bg_color,
      is_active: false,
      value,
      font_size,
      comp_height,
      popup_direction,
      selected: {
        key: "",
        value: "",
      },
    };
  }

  componentDidMount() {
    // Add Event Listner to handle the click that happens outside
    // the Custom Select Container
    document.addEventListener("mousedown", this.handleClickOutside);
    this.setState({
      defaultSelectText: this.props.defaultText,
    });
  }

  componentWillUnmount() {
    // Remove the event listner on component unmounting
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (e) => {
    if (
      !e.target.classList.contains("custom-select-option") &&
      !e.target.classList.contains("selected-text")
    ) {
      this.setState({
        is_active: false,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { type, color, size, direction, onChange } = this.props;
    const { is_active, selected } = this.state;
    if (
      prevProps.color !== color ||
      prevProps.size !== size ||
      prevState.is_active !== is_active ||
      prevProps.direction !== direction
    ) {
      const { style, icon_color, font_size, comp_height, popup_direction } =
        generateTailwind(type, color, size, direction);
      this.setState({
        style,
        icon_color,
        font_size,
        comp_height,
        popup_direction,
      });
    }

    if (prevState.selected.key !== selected.key) {
      onChange({ key: selected.key, value: selected.value });
    }
  }

  filterOnChange = (e) => {
    const { children } = this.props;
    const keywords = e.target.value?.toLowerCase().split(" ");
    const regex_string = `${keywords
      .map((word) => `(?=.*?${word})`)
      .join("")}.*`;
    const regex_pattern = new RegExp(regex_string);
    if (keywords) {
      const filtered_children = children.filter((item) =>
        regex_pattern.test(item.props.children?.toLowerCase())
      );
      this.setState({
        filtered_children,
        filter_text: keywords,
      });
    } else {
      this.setState({
        filtered_children: children,
        filter_text: keywords,
      });
    }
  };

  toggleDropdown = () => {
    const { is_active } = this.state;
    this.setState({
      is_active: !is_active,
    });
  };

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.toggleDropdown();
    }
  }

  setValue = (key, value) => {
    this.setState({
      selected: {
        key,
        value,
      },
    });
  };

  render() {
    const { children, className, color, type, size, filter_on, ...props } =
      this.props;
    const {
      style,
      icon_color,
      bg_color,
      is_active,
      comp_height,
      popup_direction,
      font_size,
      selected,
      filtered_children,
    } = this.state;

    return (
      <div className={`relative rounded-[8px] ${comp_height}`}>
        <div
          {...props}
          type=""
          className={`selected-text ${style} ${className} ${font_size} ${comp_height} flex justify-center`}
          onClick={() => this.toggleDropdown()}
        >
          <div className="w-fit max-w-[85%] whitespace-nowrap overflow-hidden text-ellipsis">
            {selected.key
              ? children.find((item) => item.props.value === selected.key)?.[
                  "props"
                ]?.["children"]
              : "Select"}
          </div>
          <div className="w-[15%] text-center">
            {is_active ? <CloseIcon /> : <Icon />}
          </div>
        </div>
        {is_active && (
          <div className="absolute z-50 mt-2 min-w-[200px]">
            {filter_on && (
              <Textfield
                className="w-full"
                color={color}
                icon={<BsSearch />}
                size="normal"
                onChange={this.filterOnChange}
              />
            )}
            <div
              ref={this.wrapperRef}
              className={twMerge(
                `overflow-y-auto max-h-96 pr-2`,
                icon_color,
                popup_direction
              )}
            >
              {filtered_children?.map((item) => {
                return (
                  <div
                    key={item.key}
                    className={`custom-select-option transition ease-in-out duration-75 rounded text-sm py-2 px-4 font-normal block cursor-pointer ${bg_color} hover:text-neutral-white bg-neutral-white mt-1 border ${icon_color}`}
                    onClick={() => {
                      this.setValue(item.props.value, item.props.children);
                      this.toggleDropdown();
                    }}
                  >
                    {item.props.children}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}
