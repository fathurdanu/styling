import React, { Component } from "react";
import { twMerge } from "tailwind-merge";
import Textfield from "../Textfield";
import { BsSearch } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
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
    const { type, color, size, direction, value, children, is_multi } =
      this.props;
    const {
      style,
      icon_color,
      bg_color,
      accent_color,
      font_size,
      comp_height,
      popup_direction,
    } = generateTailwind(type, color, size, direction, is_multi);

    let selected = [];
    let keys = [];
    if (value?.length >= 0 && is_multi) {
      keys = value?.length >= 0 ? Object.keys(value[0]) : [];
    } else {
      keys = value ? Object.keys(value) : [];
    }

    if (keys.includes("value") && keys.includes("label")) {
      selected = value;
    } else {
      selected = is_multi ? [] : null;
    }

    this.inputRef = React.createRef();
    this.searchRef = React.createRef();
    this.state = {
      filter_text: "",
      filtered_children: children,
      style,
      icon_color,
      bg_color,
      accent_color,
      is_active: false,
      font_size,
      comp_height,
      popup_direction,
      selected: selected,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { type, color, size, direction, onChange, is_multi } = this.props;
    const { is_active, selected } = this.state;
    if (
      prevProps.color !== color ||
      prevProps.size !== size ||
      prevState.is_active !== is_active ||
      prevProps.direction !== direction
    ) {
      const {
        style,
        icon_color,
        bg_color,
        accent_color,
        font_size,
        comp_height,
        popup_direction,
      } = generateTailwind(type, color, size, direction, is_multi);
      this.setState({
        style,
        icon_color,
        bg_color,
        accent_color,
        font_size,
        comp_height,
        popup_direction,
      });
    }

    if (prevState.selected?.value !== selected?.value) {
      onChange({ value: selected?.value, label: selected?.label });
    }

    if (prevState.is_active !== is_active) {
      this.setState({
        filter_text: "",
      });
      if (is_active && this.searchRef.current) {
        this.searchRef.current.focus();
      }
    }

    window.addEventListener("click", this.handler);
    return () => {
      window.removeEventListener("click", this.handler);
    };
  }

  handler = (e) => {
    if (this.inputRef.current && !this.inputRef.current.contains(e.target)) {
      this.setState({
        is_active: false,
      });
    }
  };

  filterOnChange = (e) => {
    const { children } = this.props;
    const keywords = e.target.value?.toLowerCase();
    const regex_string = `${keywords
      .split(" ")
      .map((word) => `(?=.*?${word})`)
      .join("")}.*`;
    const regex_pattern = new RegExp(regex_string);
    if (keywords) {
      const filtered_children = children.filter((item) =>
        regex_pattern.test(item.props?.children?.toLowerCase())
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

  removeOption = (option) => {
    const { selected } = this.state;
    return selected.filter((o) => o.value !== option.value);
  };

  handleClick = (item) => {
    const { value, children } = item;
    this.onItemClick({
      value: value,
      label: children,
    });
    this.toggleDropdown();
  };

  onItemClick = (props) => {
    const { is_multi, onChange } = this.props;
    const { selected } = this.state;
    let newValue;
    if (is_multi) {
      if (selected.findIndex((o) => o.value === props.value) >= 0) {
        newValue = this.removeOption(props);
      } else {
        newValue = [...selected, props];
      }
    } else {
      newValue = props;
    }

    this.setState({
      selected: newValue,
    });
    onChange(newValue);
  };

  onTagRemove = (props) => {
    const { onChange } = this.props;
    const newValue = this.removeOption(props);
    this.setState({
      selected: newValue,
    });
    onChange(newValue);
  };

  render() {
    const {
      children,
      className,
      color,
      type,
      size,
      filter_on,
      placeholder,
      is_multi,
      ...props
    } = this.props;
    const {
      style,
      icon_color,
      bg_color,
      accent_color,
      is_active,
      comp_height,
      popup_direction,
      font_size,
      selected,
      filtered_children,
    } = this.state;

    const getDisplay = () => {
      if (!selected || selected.length === 0) {
        return placeholder;
      }
      if (is_multi) {
        return (
          <div className="flex flex-wrap gap-1">
            {selected.map((option) => {
              return (
                <div
                  key={option.value}
                  className={`${accent_color} text-neutral-white mp-p4 py-[2px] px-[6px] rounded-[8px] flex items-center`}
                >
                  {option.label}
                  <span
                    onClick={(e) => this.onTagRemove(option)}
                    className="flex mp-h7 items-center text-neutral-white"
                  >
                    <IoClose />
                  </span>
                </div>
              );
            })}
          </div>
        );
      }
      return selected.label;
    };

    return (
      <div className={`relative rounded-[8px] ${comp_height}`}>
        <div
          {...props}
          type=""
          className={`${style} ${className} ${font_size} ${comp_height} flex justify-between`}
          onClick={() => this.toggleDropdown()}
          ref={this.inputRef}
        >
          <div className="w-fit whitespace-nowrap overflow-hidden text-ellipsis px-2">
            {getDisplay()}
          </div>
          <div className="w-10 text-center">{<Icon />}</div>
        </div>
        {is_active && (
          <div
            className={twMerge(
              "absolute z-50 mt-2 min-w-[200px]",
              icon_color,
              popup_direction
            )}
          >
            {filter_on && (
              <Textfield
                ref={this.searchRef}
                className="w-full"
                color={color}
                icon={<BsSearch />}
                size="normal"
                onChange={this.filterOnChange}
              />
            )}
            <div className="overflow-y-auto max-h-96 pr-2">
              {filtered_children?.map((item) => {
                return (
                  <div
                    key={item.key}
                    className={`rounded text-sm py-2 px-4 font-normal block cursor-pointer ${bg_color} hover:text-neutral-white bg-neutral-white mt-1 border ${icon_color}`}
                    onClick={() => {
                      this.handleClick(item.props);
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
