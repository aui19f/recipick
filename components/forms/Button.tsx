import clsx from "clsx";

export enum variantEnum {
  primary = "primary",
  secondary = "secondary",
  success = "success",
  danger = "danger",
  warning = "warning",
  info = "info",
  light = "light",
  dark = "dark",
}

interface IButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;

  onClick?: () => void;
  variant?: variantEnum;
  // className?: string;
}

export default function Button({
  type = "button",
  disabled = false,
  children,
  onClick,
  variant = variantEnum.light,
}: IButtonProps) {
  const baseStyle = "h-12 rounded-md p-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-300 text-black hover:bg-gray-400",
    success: "bg-green-500 text-white hover:bg-green-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    warning: "bg-yellow-400 text-black hover:bg-yellow-500",
    info: "bg-sky-400 text-white hover:bg-sky-500",
    light: "bg-white text-black border",
    dark: "bg-gray-900 text-white hover:bg-black",
    // "outline-primary": "",
    // "outline-secondary": "",
    // "outline-success": "",
    // "outline-danger": "",
    // "outline-warning": "",
    // "outline-info": "",
    // "outline-light": "",
    // "outline-dark": "",
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(baseStyle, variants[variant])}
    >
      {children}
    </button>
  );
}
