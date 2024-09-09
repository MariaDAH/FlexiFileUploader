import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Textbox } from "./textbox";

const withBackgroundChange = (Story: any, context: any) => {
  const { colorTheme } = context.args;
  const backgroundColor = colorTheme == "light" ? "#F1F1F1" : "#15232D";
  return (
    <div
      style={{ backgroundColor, padding: "20px" }}
      className="w-screen h-60 flex justify-center items-center"
    >
      <Story {...context} />
    </div>
  );
};

const meta = {
  title: "Components/ui/Textbox",
  component: Textbox,
  decorators: [withBackgroundChange],
  parameters: {
    layout: "centered",
    backgrounds: {
      disable: false,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    colorTheme: {
      control: {
        type: "radio",
      },
      options: ["light", "dark"],
    },
    type: {
      control: {
        type: "radio",
      },
      options: ["text", "email", "image", "password", "url"],
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Textbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: "text",
    colorTheme: "light",
    size: "large",
    name: "",
    id: "",
    enabled: true,
    minlength: 0,
    maxlength: 120,
    pattern: "",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    colorTheme: "light",
    size: "medium",
    name: "",
    id: "",
    enabled: true,
    minlength: 0,
    maxlength: 120,
    pattern: "",
    required: true,
  },
};

export const Email: Story = {
  args: {
    type: "password",
    colorTheme: "light",
    size: "medium",
    name: "",
    id: "",
    enabled: true,
    minlength: 0,
    maxlength: 120,
    pattern: "",
    required: true,
  },
};

export const Large: Story = {
  args: {
    type: "text",
    size: "large",
    colorTheme: "light",
    name: "",
    id: "",
    enabled: true,
    minlength: 0,
    maxlength: 120,
    pattern: "",
  },
};

export const Small: Story = {
  args: {
    type: "text",
    size: "small",
    colorTheme: "light",
    name: "",
    id: "",
    enabled: true,
    minlength: 0,
    maxlength: 120,
    pattern: "",
  },
};
