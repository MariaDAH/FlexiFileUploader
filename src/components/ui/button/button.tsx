"use client";
import React from "react";
import "./button.css";

export interface ButtonProps {
  type?: "submit" | "button" | "reset";
  /**
   * Is this the principal call to action on the page.tsx?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  colorTheme?: string;
  /**
   * How large should the button.tsx be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

export const Button = ({
  type = "button",
  primary = false,
  size = "medium",
  colorTheme = "light",
  label,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";
  const backgroundColor = colorTheme == "light" ? "#dde7eb" : "#dde7eb";
  const color =
    colorTheme == "light" ? "--color-text-secondary" : "--color-text-secondary";
  const boxshadow =
    colorTheme == "light" ? "transparent" : "inset 0px 0px 0px 3px white";
  return (
    <button
      type={type}
      className={["storybook-button", `storybook-button--${size}`, mode].join(
        " ",
      )}
      {...props}
    >
      {label}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
          color: ${color};
          box-shadow: ${boxshadow};
        }
      `}</style>
    </button>
  );
};
