export default function generate_style(type, color, size) {
  let colors = {};
  if (type === "toggle") {
    colors = {
      red: "peer-checked:bg-warning-danger-2 peer-focus:ring-2 peer-focus:ring-warning-danger-2",
      green:
        "peer-checked:bg-warning-safe-2 peer-focus:ring-2 peer-focus:ring-warning-safe-2",
      blue: "peer-checked:bg-warning-action-2 peer-focus:ring-2 peer-focus:ring-warning-action-2",
      yellow:
        "peer-checked:bg-warning-caution-2 peer-focus:ring-2 peer-focus:ring-warning-caution-2",
    };
  } else {
    colors = {
      red: "text-warning-danger-2 focus:ring-warning-danger-1 focus:ring-2",
      green: "text-warning-safe-2 focus:ring-warning-safe-1 focus:ring-2",
      blue: "text-warning-action-2 focus:ring-warning-action-1 focus:ring-2",
      yellow:
        "text-warning-caution-2 focus:ring-warning-caution-1 focus:ring-2",
    };
  }

  const sizes = {
    small: "mp-s3",
    normal: "mp-s2",
    large: "mp-h6",
  };

  let component_height = {};
  if (type === "toggle") {
    component_height = {
      small:
        "w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:bg-warning-action after:bg-neutral-white",
      normal:
        "h-[30px] w-14 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[30px] peer-checked:after:border-white after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:bg-warning-action after:bg-neutral-white",
      large:
        "h-[40px] w-[70px] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[35px] peer-checked:after:border-white after:absolute after:top-[5px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all after:bg-warning-action after:bg-neutral-white",
    };
  } else {
    component_height = {
      small: "w-6 h-6 border-gray-300 rounded hover:scale-110",
      normal:
        "w-[30px] h-[30px] bg-gray-100 border-gray-300 rounded hover:scale-110",
      large:
        "w-[40px] h-[40px] bg-gray-100 border-gray-300 rounded hover:scale-110",
    };
  }

  const font_size = sizes[size];
  const comp_height = component_height[size];
  const bg_color = colors[color];

  return { font_size, comp_height, bg_color };
}
