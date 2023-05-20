import { twMerge } from "tailwind-merge";

export default function generate_style(type, color, status, size) {
  const icon_sizes = {
    small: "w-[30px] h-[30px]",
    normal: "w-[38px] h-[38px]",
    large: "w-[50px] h-[50px]",
  };

  const frames = {
    primary: `rounded-[8px] py-1 px-2 inline-block cursor-pointer select-none hover:shadow-md hover:shadow-neutral-black hover:scale-110 bg-neutral-dark-grey`,
    secondary: `border rounded-[8px] py-1 px-2 inline-block cursor-pointer select-none hover:shadow-md hover:shadow-neutral-black hover:scale-110`,
    tertiary: `rounded-[8px] py-1 px-2 inline-block cursor-pointer select-none hover:drop-shadow-md hover:shadow-neutral-black hover:scale-110`,
    icon: `rounded-full py-1 inline-block cursor-pointer select-none hover:shadow-md hover:shadow-neutral-black hover:scale-110 bg-neutral-dark-grey`,
  };

  // size

  let sizes = {};
  if (type === "icon") {
    sizes = {
      small: "mp-h7 h-[30px]",
      normal: "mp-h6 h-[38px]",
      large: "mp-h5 h-[50px] w-[300px]",
    };
  } else {
    sizes = {
      small: "mp-s4 h-[30px] py-[5px] px-[5px]",
      normal: "mp-s2 h-[38px] py-[6px] px-[10px]",
      large: "mp-h6 h-[50px] w-[300px]",
    };
  }

  const basic_style = [
    {
      color: "red",
      primary: `text-neutral-white bg-warning-danger-2 focus:ring-[2px] focus:ring-offset-1 focus:ring-warning-danger-1`,
      secondary: `border-warning-danger-2 text-warning-danger-2 bg-neutral-white`,
      tertiary: `text-warning-danger-2`,
      icon: `text-neutral-white bg-warning-danger-2`,
    },
    {
      color: "green",
      primary: `text-neutral-white bg-warning-safe-2`,
      secondary: `border-warning-safe-2 text-warning-safe-2 bg-neutral-white`,
      tertiary: `text-warning-safe-2`,
      icon: `text-neutral-white bg-warning-safe-2`,
    },
    {
      color: "blue",
      primary: `text-neutral-white bg-warning-action-2`,
      secondary: `border-warning-action-2 text-warning-action-2 bg-neutral-white`,
      tertiary: `text-warning-action-2`,
      icon: `text-neutral-white bg-warning-action-2`,
    },
    {
      color: "yellow",
      primary: `text-neutral-white bg-warning-caution-2`,
      secondary: `border-warning-caution-2 text-warning-caution-2 bg-neutral-white`,
      tertiary: `text-warning-caution-2`,
      icon: `text-neutral-white bg-warning-caution-2`,
    },
  ];

  // status
  const active_style = [
    {
      color: "red",
      primary: `text-neutral-white bg-warning-danger-1 `,
      secondary: `border-warning-danger-1 text-warning-danger-1 bg-warning-danger-4`,
      tertiary: `text-warning-danger-1`,
      icon: `text-neutral-white bg-warning-danger-1`,
    },
    {
      color: "green",
      primary: `text-neutral-white bg-warning-safe-1`,
      secondary: `border-warning-safe-1 text-warning-safe-1 bg-warning-safe-4`,
      tertiary: `text-warning-safe-1`,
      icon: `text-neutral-white bg-warning-safe-1`,
    },
    {
      color: "blue",
      primary: `text-neutral-white bg-warning-action-1`,
      secondary: `border-warning-action-1 text-warning-action-1 bg-warning-action-4`,
      tertiary: `text-warning-action-1`,
      icon: `text-neutral-white bg-warning-action-1`,
    },
    {
      color: "yellow",
      primary: `text-neutral-white bg-warning-caution-1`,
      secondary: `border-warning-caution-1 text-warning-caution-1 bg-warning-caution-4`,
      tertiary: `text-warning-caution-1`,
      icon: `text-neutral-white bg-warning-caution-1`,
    },
  ];

  const disable_style = {
    primary: `text-neutral-dark-grey bg-neutral-subtle-grey hover:shadow-none hover:scale-100 cursor-default`,
    secondary: `border-neutral-dark-grey text-neutral-dark-grey cursor-default hover:shadow-none hover:scale-100`,
    tertiary: `text-neutral-dark-grey hover:drop-shadow-none hover:scale-100 cursor-default`,
    icon: "text-neutral-dark-grey bg-neutral-subtle-grey hover:shadow-none hover:scale-100 cursor-default",
  };

  const style_before_merge = [frames[type]];

  style_before_merge.push(
    basic_style.find((item) => item.color === color)[type]
  );

  if (status === "active") {
    style_before_merge.push(
      active_style.find((item) => item.color === color)[type]
    );
  } else if (status === "loading" || status === "disable") {
    style_before_merge.push(disable_style[type]);
  }

  if (type === "icon") {
    style_before_merge.push(icon_sizes[size]);
  }

  let style = "";
  if (style_before_merge.length > 1) {
    style = twMerge(style_before_merge);
  }

  if (size) {
    style = `${style} ${sizes[size]}`;
  }

  return style;
}
