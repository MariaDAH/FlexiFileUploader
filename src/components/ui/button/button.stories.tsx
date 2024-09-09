import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./button";

//Try with theme provider if I can get the globals
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
  title: "Components/ui/Button",
  component: Button,
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
      options: ["reset", "submit", "button"],
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    colorTheme: "light",
    size: "large",
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
    colorTheme: "light",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
    colorTheme: "light",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
    colorTheme: "light",
  },
};
