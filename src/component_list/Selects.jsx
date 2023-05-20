import React, { Component } from "react";
import { Select } from "../components";
import { AiOutlineEdit } from "react-icons/ai";

export default class Selects extends Component {
  render() {
    const colors = ["red", "green", "blue", "yellow"];
    const sizes = ["small", "normal", "large"];

    const options = [
      { value: "green", label: "Green" },
      { value: "blue", label: "Blue" },
      { value: "red", label: "Red" },
      { value: "yellow", label: "Yellow" },
      { value: "orange", label: "Orange" },
      { value: "pink", label: "Pink" },
      { value: "purple", label: "Purple" },
      { value: "grey", label: "Grey" },
    ];

    return (
      <div className="mp-center flex-col h-[200px] w-full">
        <div className="w-full mp-center mp-h2">Select</div>
        {colors.map((color, i) => (
          <div key={i} className="flex flex-row gap-2">
            {sizes.map((size, j) => (
              <Select
                className="w-[400px]"
                key={j}
                color={color}
                size={size}
                isSearchable
                isMulti
                placeHolder="Select..."
                options={options}
                onChange={(value) => {
                  console.log(value);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}
