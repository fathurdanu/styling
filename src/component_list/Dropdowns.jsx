import React, { Component } from "react";
import Dropdown from "../components/Dropdown";

export default class Dropdowns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
  }

  onChange = () => {};

  render() {
    const options = [];
    for (let i = 0; i < 21; i++) {
      options.push({
        key: i + 1,
        value: `Pilihan ${i + 1} ${i % 10 === 0 ? "panjang aja teksnya" : ""}`,
      });
    }

    const types = ["primary", "secondary", "tertiary"];

    const colors = ["red", "green", "blue", "yellow"];

    const sizes = ["small", "normal", "large"];

    return (
      <div className="block w-full mt-14">
        <div className="w-full mp-center mp-h2">Dropdown</div>
        {sizes.map((size, i) => (
          <div key={i} className="block w-full mb-14">
            {types.map((type, j) => (
              <div key={`${i}${j}`} className="flex justify-around w-full p-1">
                {colors.map((color, k) => {
                  let result = "";
                  if (k === 0) {
                    result = "left";
                  } else if (k === 1) {
                    result = "down";
                  } else if (k === 2) {
                    result = "up";
                  } else {
                    result = "right";
                  }
                  return (
                    <Dropdown
                      className="w-[400px]"
                      key={`${i}${j}${k}`}
                      onChange={(value) => console.log(value)}
                      type={type}
                      color={color}
                      size={size}
                      direction={result}
                      filter_on
                    >
                      {options.map((item) => (
                        <option key={item.key} value={item.key}>
                          {item.value}
                        </option>
                      ))}
                    </Dropdown>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
