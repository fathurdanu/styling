import React, { Component } from "react";
import generate_style from "./style";

export default class LayoutCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      type,
      color,
      size,
      first,
      second,
      third,
      image,
      topCorner,
      ...props
    } = this.props;

    const height_size = generate_style(type, first, second, third);

    let content;
    if (type === "primary" || !type) {
      content = (
        <div {...props} className="border h-[300px] w-[300px] rounded-md">
          {first && <div className={height_size["first"]}>{first}</div>}
          {second && <div className={height_size["second"]}>{second}</div>}
          {third && <div className={height_size["third"]}>{third}</div>}
        </div>
      );
    } else if (type === "secondary") {
      content = (
        <div {...props} className="border h-[300px] w-[300px] rounded-md flex">
          <div className={height_size["left"]}>
            <div className={height_size["first"]}>{first}</div>
            <div className={height_size["second"]}>{second}</div>
          </div>
          <div className={height_size["third"]}>{third}</div>
        </div>
      );
    } else if (type === "tertiary") {
      content = (
        <div {...props} className="border h-[300px] w-[300px] rounded-md">
          <div className={height_size["first"]}>{first}</div>
          <div className={height_size["box"]}>
            <div className={height_size["second"]}>{second}</div>
            <div className={height_size["third"]}>{third}</div>
          </div>
        </div>
      );
    } else if (type === "image") {
      content = (
        <div {...props} className="border h-[300px] w-[300px] rounded-md">
          <div className="p-2 h-[50%]">
            <img
              className="rounded-md object-cover w-full h-full"
              src={image}
            />
            {topCorner && (
              <div className="w-[100px] h-8 relative right-[-175px] top-[-125px] flex justify-end">
                <div className="w-fit">{topCorner}</div>
              </div>
            )}
          </div>
          <div className="h-[50%]">
            {first && <div className={height_size["first"]}>{first}</div>}
            {second && <div className={height_size["second"]}>{second}</div>}
            {third && <div className={height_size["third"]}>{third}</div>}
          </div>
        </div>
      );
    }

    return <>{content}</>;
  }
}
