import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "@storybook/test";
import { ArrowRight, Check, Mail, Trash2 } from "lucide-react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "outline",
        "ghost",
        "success",
        "destructive",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "small-icon"],
    },
    isLoading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    onClick: { action: "clicked" },
  },
  args: {
    variant: "primary",
    size: "default",
    isLoading: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Button Story
 */
export const Default: Story = {
  args: {
    children: "Submit",
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /submit/i });

    await expect(button).toBeInTheDocument();
    await expect(button).toHaveTextContent("Submit");
    await expect(button).not.toBeDisabled();

    await userEvent.click(button);

    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * Secondary Button Story
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
};

export const WithIcons: Story = {
  args: {
    children: (
      <>
        <Mail size={16} />
        <span>Continue</span>
        <ArrowRight size={16} />
      </>
    ),
  },
};

export const Save: Story = {
  args: {
    variant: "success",
    children: (
      <>
        <Check size={16} />
        <span>Saved</span>
      </>
    ),
  },
};

export const DangerWithIcon: Story = {
  args: {
    variant: "destructive",
    children: (
      <>
        <Trash2 size={16} />
        <span>Delete</span>
      </>
    ),
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
};

export const IconOnly: Story = {
  args: {
    size: "icon",
    children: <ArrowRight size={18} />,
    onClick: fn(),
  },
  render: (args) => <Button {...args} aria-label="Next" />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /next/i });

    await expect(button).toHaveAccessibleName("Next");

    await userEvent.click(button);

    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Loading: Story = {
  args: {
    children: "Submitting",
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /submitting/i });

    await expect(button).toHaveAttribute("aria-busy", "true");
    await expect(button).toBeDisabled();

    const loader = canvas.getByTestId("loader");

    await expect(loader).toBeInTheDocument();

    await userEvent.click(button);
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /disabled/i });

    await expect(button).toBeDisabled();

    await userEvent.click(button);

    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
