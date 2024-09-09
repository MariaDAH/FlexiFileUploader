"use client";
import React from "react";
import "./textbox.css";

export interface TextboxProps {
  type?: "text" | "email" | "image" | "password" | "url";

  /**
   * Control name to link with label
   */
  name?: string;

  /**
   * Form property id
   */
  id?: string;

  /**
   * Can I fill out the textbox?
   */
  enabled?: boolean;

  /**
   * What background color to use
   */
  colorTheme?: string;

  /**
   * How large should the textbox.tsx be?
   */
  size?: "small" | "medium" | "large";

  /**
   * What is the minimum number of characters in the texbox?
   */
  minlength?: number;

  /**
   * What is the maximum number of characters in the texbox?
   */
  maxlength?: number;
  /**
   * Regular expression check
   */
  pattern?: string;

  /**
   * Regular expression check
   */
  required?: boolean;

  /**
   * Optional click handler
   */
  onClick?: () => void;
}

export const Textbox = ({
  type = "text",
  name = "textbox",
  id = "textbox",
  size = "medium",
  colorTheme = "light",
  enabled = true,
  required = false,
  ...props
}: TextboxProps) => {
  return (
    <>
      <input className={"storybook-textbox"} {...props} />
      <style jsx>{`
        input {
          background-color: aliceblue;
        }
      `}</style>
    </>
  );
};
