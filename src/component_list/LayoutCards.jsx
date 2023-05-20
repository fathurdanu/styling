import React, { Component } from "react";
import { LayoutCard, Button } from "../components";

export default class LayoutCards extends Component {
  render() {
    const image =
      "https://arsitagx-master-article.s3.ap-southeast-1.amazonaws.com/article-photo/1044/desain-interior-mewah-cover.jpeg";

    const first = (
      <div className="bg-accent-red h-full w-full mp-center">First</div>
    );

    const second = (
      <div className=" bg-accent-orange h-full w-full mp-center">Second</div>
    );

    const third = (
      <div className="bg-accent-teal h-full w-full mp-center">Third</div>
    );
    return (
      <>
        <div className="w-full mp-center mp-h2">LayoutCard</div>
        <div className="flex w-full gap-2 h-[500px]">
          <LayoutCard
            type="primary"
            first={first}
            second={second}
            third={third}
          />
          <LayoutCard
            type="secondary"
            first={first}
            second={second}
            third={third}
          />
          <LayoutCard
            type="tertiary"
            first={first}
            second={second}
            third={third}
          />
          <LayoutCard
            type="image"
            image={image}
            topCorner={
              <Button
                className="w-fit border border-neutral-white"
                type="primary"
                color="blue"
                size="small"
              >
                TopCorner
              </Button>
            }
            first={first}
            second={second}
            third={third}
          />
        </div>
      </>
    );
  }
}
