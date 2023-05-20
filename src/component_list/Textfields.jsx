import React, { Component } from "react";
import { Textfield } from "../components";
import { AiOutlineEdit } from "react-icons/ai";

export default class Textfields extends Component {
  render() {
    const colors = ["red", "green", "blue", "yellow"];
    const sizes = ["small", "normal", "large"];

    return (
      <div className="mp-center flex-col h-[200px] w-full">
        <div className="w-full mp-center mp-h2">Textfield</div>
        {colors.map((color, i) => (
          <div key={i} className="flex flex-row gap-2">
            {sizes.map((size, j) => (
              <Textfield
                key={j}
                color={color}
                size={size}
                icon={<AiOutlineEdit />}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}
