import { Icon } from "@iconify/react";

const colorMap = {
  info: "rgb(71, 105, 204)",
  success: "rgb(52, 201, 52)",
  warning: "rgb(207, 204, 72)",
  error: "rgb(201, 60, 70)",
};

const bgColorMap = {
  info: "rgba(71, 105, 204,0.4)",
  success: "rgba(52, 201, 52,0.4)",
  warning: "rgba(207, 204, 72,0.4)",
  error: "rgba(201, 60, 70,0.4)",
};

const Iconify = ({
  icon,
  width = 20,
  color,
  padding = "12px",
  style,
  marginRight = "10px",
}) => {
  return (
    <div
      style={{
        ...style,
        borderRadius: "5px",
        backgroundColor: bgColorMap[color],
        backgroundOpacity: "0.5",
        padding,
        display: "flex",
        alignItems: "center",
        marginRight,
      }}
    >
      <Icon height={width} width={width} icon={icon} color={colorMap[color]} />
    </div>
  );
};

export default Iconify;
