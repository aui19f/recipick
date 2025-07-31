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
  const baseStyle = "";
  const variants = {
    primary: "",
    secondary: "",
    success: "",
    danger: "",
    warning: "",
    info: "",
    light: "",
    dark: "",
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
