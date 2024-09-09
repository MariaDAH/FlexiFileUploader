"use client";
import React from "react";
import "./dropdown.css";

export interface DropdownProps {
  options: { value: string; key: string | number | null }[];

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
   * Allow multiple expression check
   */
  multiple?: boolean;

  /**
   * Regular expression check
   */
  required?: boolean;

  /**
   * Optional click handler
   */
  onSelect: (selectedValue: any) => void;
}

export const Dropdown = ({
  name = "textbox",
  id = "textbox",
  size = "medium",
  colorTheme = "light",
  enabled = true,
  required = false,
  onSelect,
  ...props
}: DropdownProps) => {
  const handleChange = (e: any) => {
    const selectedValue = e.target.value;
    onSelect(selectedValue);
  };

  return (
    <>
      <label htmlFor={id}>{name}</label>
      <select
        className={"storybook-textbox"}
        name={id}
        onChange={handleChange}
        {...props}
      >
        <option value="">--Please choose an option--</option>
        <>
          {props?.options?.length > 0 ? (
            props.options.map((option) => {
              return (
                <option value={option.value} key={option.key}>
                  {option.value}
                </option>
              );
            })
          ) : (
            <></>
          )}
        </>
      </select>
      {/*<style jsx>{`
                input {
                    background-color: aliceblue;
                }
            `}</style>*/}
    </>
  );
};
