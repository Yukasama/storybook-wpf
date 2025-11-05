import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Loader } from "@/components/loader/loader";

const meta: Meta<typeof Loader> = {
  title: "Components/Loader",
  component: Loader,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: {
        type: "number",
        min: 12,
        max: 96,
        step: 4,
      },
    },
  },
  args: { size: 48 },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { size: 36 } };
export const Large: Story = { args: { size: 72 } };
