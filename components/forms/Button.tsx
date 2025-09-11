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
    primary: "bg-brand-primary text-white ",
    secondary: "bg-gray-300 text-black ",
    success: "bg-green-500 text-white",
    danger: "bg-red-500 text-white ",
    warning: "bg-yellow-400 text-black ",
    info: "bg-sky-400 text-white",
    light: "bg-white text-black border",
    dark: "bg-gray-900 text-white ",
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
