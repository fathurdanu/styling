import { twMerge } from "tailwind-merge";

export default function generateTailwind(
  type,
  color,
  size,
  direction,
  is_multi
) {
  const frames = {
    primary: `rounded-[8px] py-1 px-2 inline-block cursor-pointer select-none hover:shadow-md hover:shadow-neutral-black hover:scale-110 bg-neutral-black`,
    secondary: `border rounded-[8px] py-1 px-2 inline-block cursor-pointer select-none hover:shadow-md hover:shadow-neutral-black hover:scale-110`,
    tertiary: `rounded-[8px] py-1 px-2 inline-block cursor-pointer select-none hover:drop-shadow-md hover:shadow-neutral-black hover:scale-110`,
  };

  const directions = {
    down: `top-[110%] left-0 mt-[0.125rem]`,
    left: `right-[105%] top-0 mr-[0.125rem]`,
    right: `left-[105%] top-0 ml-[0.125rem]`,
    up: `bottom-[110%] left-0 mb-[0.125rem]`,
  };

  // size
  const sizes = {
    small: "mp-s4 p-[5px]",
    normal: "mp-s2 py-[6px] px-[10px]",
    large: "mp-h6 w-[300px]",
  };

  const component_height = {
    small: `${is_multi ? "min-h-[30px]" : "h-[30px]"}`,
    normal: `${is_multi ? "min-h-[38px]" : "h-[38px]"}`,
    large: `${is_multi ? "min-h-[50px]" : "h-[50px]"}`,
  };

  const basic_style = [
    {
      color: "red",
      primary: `text-neutral-white bg-warning-danger-2`,
      secondary: `border-warning-danger-2 text-warning-danger-2 bg-neutral-white`,
      tertiary: `text-warning-danger-2`,
    },
    {
      color: "green",
      primary: `text-neutral-white bg-warning-safe-2`,
      secondary: `border-warning-safe-2 text-warning-safe-2 bg-neutral-white`,
      tertiary: `text-warning-safe-2`,
    },
    {
      color: "blue",
      primary: `text-neutral-white bg-warning-action-2`,
      secondary: `border-warning-action-2 text-warning-action-2 bg-neutral-white`,
      tertiary: `text-warning-action-2`,
    },
    {
      color: "yellow",
      primary: `text-neutral-white bg-warning-caution-2`,
      secondary: `border-warning-caution-2 text-warning-caution-2 bg-neutral-white`,
      tertiary: `text-warning-caution-2`,
    },
  ];

  const style_before_merge = [frames[type]];

  style_before_merge.push(
    basic_style.find((item) => item.color === color)[type]
  );

  let style = "";
  if (style_before_merge.length > 1) {
    style = twMerge(style_before_merge);
  }

  const colors = {
    text: {
      red: "text-warning-danger-2",
      green: "text-warning-safe-2",
      blue: "text-warning-action-2",
      yellow: "text-warning-caution-2",
    },
    bg: {
      red: "hover:bg-warning-danger-2",
      green: "hover:bg-warning-safe-2",
      blue: "hover:bg-warning-action-2",
      yellow: "hover:bg-warning-caution-2",
    },
    accent: {
      red: "bg-warning-danger-1",
      green: "bg-warning-safe-1",
      blue: "bg-warning-action-1",
      yellow: "bg-warning-caution-1",
    },
  };

  const icon_color = colors["text"][color];
  const font_size = sizes[size];
  const comp_height = component_height[size];
  const popup_direction = directions[direction];
  const bg_color = colors["bg"][color];
  const accent_color = colors["accent"][color];
  return {
    style,
    icon_color,
    bg_color,
    accent_color,
    font_size,
    comp_height,
    popup_direction,
  };
}
