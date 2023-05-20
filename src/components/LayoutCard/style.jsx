export default function generate_style(type, first, second, third) {
  const height_size = {};
  if (type === "primary") {
    if (!second && !third) {
      height_size["first"] = "h-full";
    } else if (second && !third) {
      height_size["first"] = "h-[50%]";
      height_size["second"] = "h-[50%]";
    } else if (second && third) {
      height_size["first"] = "h-[33.3333%]";
      height_size["second"] = "h-[33.3333%]";
      height_size["third"] = "h-[33.3333%]";
    }
  } else if (type === "secondary") {
    if (second && third) {
      height_size["first"] = "h-[50%]";
      height_size["second"] = "h-[50%]";
      height_size["third"] = "h-full w-[25%]";
      height_size["left"] = "h-full w-[75%]";
    } else if (second && !third) {
      height_size["first"] = "h-[50%]";
      height_size["second"] = "h-[50%]";
      height_size["left"] = "w-full";
      height_size["third"] = "";
    } else if (!second && !third) {
      height_size["first"] = "h-full w-full";
      height_size["left"] = "h-[50%] w-full";
      height_size["third"] = "";
    }
  } else if (type === "tertiary") {
    if (second && third) {
      height_size["first"] = "h-[20%]";
      height_size["box"] = "h-[80%] flex";
      height_size["second"] = "w-[50%]";
      height_size["third"] = "w-[50%]";
    } else if (second && !third) {
      height_size["first"] = "h-[20%]";
      height_size["second"] = "h-full";
      height_size["box"] = "h-[80%]";
      height_size["third"] = "";
    } else if (!second && !third) {
      height_size["first"] = "h-full w-full";
      height_size["box"] = "";
      height_size["third"] = "";
    }
  } else if (type === "image") {
    if (!second && !third) {
      height_size["first"] = "h-full";
    } else if (second && !third) {
      height_size["first"] = "h-[50%]";
      height_size["second"] = "h-[50%]";
    } else if (second && third) {
      height_size["first"] = "h-[33.3333%]";
      height_size["second"] = "h-[33.3333%]";
      height_size["third"] = "h-[33.3333%]";
    }
  }
  return height_size;
}
