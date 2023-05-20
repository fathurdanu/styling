import { twMerge } from "tailwind-merge";

export default function generate_style(color, size, icon) {
  const sizes = {
    small: "h-[30px] mp-p4",
    normal: "h-[38px] mp-p3",
    large: "h-[50px] text-s1",
  };

  const colors = {
    red: "border-warning-danger-2 focus:ring-warning-danger-3 focus:border-warning-danger-3",
    green:
      "border-warning-safe-2 focus:ring-warning-safe-3 focus:border-warning-safe-3",
    blue: "border-warning-action-2 focus:ring-warning-action-3 focus:border-warning-action-3",
    yellow:
      "border-warning-caution-2 focus:ring-warning-caution-3 focus:border-warning-caution-3",
  };

  let padding = "";
  if (icon && size === "large") {
    padding = "pl-[40px]";
  } else if (!icon) {
    padding = "pl-2";
  } else {
    padding = "pl-[30px]";
  }

  const style_before_merge = [
    `flex flex-row items-center ${padding} rounded-[8px] border-2 focus:ring outline-none focus:shadow-md focus:shadow-neutral-dark-grey`,
  ];

  if (color) {
    style_before_merge.push(colors[color]);
  }

  if (size) {
    style_before_merge.push(sizes[size]);
  }

  let style = "";
  if (style_before_merge.length > 1) {
    style = twMerge(style_before_merge);
  } else {
    style = style_before_merge.pop();
  }

  let margin = "";
  if (icon && size === "large") {
    margin = "m-3 text-h6";
  } else {
    margin = "m-2";
  }

  const icon_colors = {
    red: "text-warning-danger-2",
    green: "text-warning-safe-2",
    blue: "text-warning-action-2",
    yellow: "text-warning-caution-2",
  };

  const icon_color = icon_colors[color];

  return { style, margin, icon_color };
}
