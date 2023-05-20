import React, { Component } from "react";
import Checkbox from "../components/Checkbox";

export default class Checkboxs extends Component {
  render() {
    const types = ["checkbox", "toggle"];

    const colors = ["red", "green", "blue", "yellow"];

    const sizes = ["small", "normal", "large"];

    return (
      <div className="block w-full mt-14">
        <div className="w-full mp-center mp-h2">Checkbox</div>
        {sizes.map((size, i) => (
          <div key={i} className="block w-full mb-10">
            {types.map((type, j) => (
              <div key={`${i}${j}`} className="flex justify-around w-full">
                {colors.map((color, k) => (
                  <Checkbox
                    id={`${i}${j}${k}`}
                    key={`${i}${j}${k}`}
                    label="hello"
                    type={type}
                    size={size}
                    color={color}
                    onChange={(e) => {
                      console.log(e.target.checked);
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
