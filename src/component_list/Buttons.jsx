import React, { Component } from "react";
import { Button } from "../components";
import { AiOutlineEdit } from "react-icons/ai";

export default class Buttons extends Component {
  render() {
    const types = ["primary", "secondary", "tertiary", "icon"];

    const status = ["default", "active", "loading", "disable"];

    const colors = ["red", "green", "blue", "yellow"];

    const sizes = ["small", "normal", "large"];
    return (
      <div className="mp-center flex-col w-full">
        <div className="w-full mp-center mp-h2">Button</div>
        {colors.map((color, i) => (
          <div key={i} className="block w-full mb-10">
            {sizes.map((size, j) => (
              <div key={`${i}${j}`} className="flex justify-around w-full p-1">
                {status.map((stat, k) => (
                  <div key={`${i}${j}${k}`} className="w-full">
                    {types.map((type, l) => (
                      <Button
                        key={`${i}${j}${k}${l}`}
                        type={type}
                        status={stat}
                        color={color}
                        size={size}
                      >
                        {type === "icon" ? <AiOutlineEdit /> : type}
                      </Button>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
