import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "./avatar";
import { AvatarWithInfo } from "./avatar-with-info";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    color: {
      control: "select",
      options: [
        "red",
        "orange",
        "amber",
        "yellow",
        "lime",
        "green",
        "emerald",
        "cyan",
        "blue",
        "indigo",
        "purple",
        "pink",
      ],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fallback: "H",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    fallback: "S",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    fallback: "M",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    fallback: "L",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    fallback: "X",
  },
};

export const WithColor: Story = {
  args: {
    fallback: "H",
    color: "blue",
  },
};

export const RainbowColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Avatar fallback="R" color="red" />
      <Avatar fallback="O" color="orange" />
      <Avatar fallback="A" color="amber" />
      <Avatar fallback="Y" color="yellow" />
      <Avatar fallback="L" color="lime" />
      <Avatar fallback="G" color="green" />
      <Avatar fallback="E" color="emerald" />
      <Avatar fallback="C" color="cyan" />
      <Avatar fallback="B" color="blue" />
      <Avatar fallback="I" color="indigo" />
      <Avatar fallback="P" color="purple" />
      <Avatar fallback="K" color="pink" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar fallback="H" size="md" color="red" />
      <Avatar fallback="A" size="md" color="green" />
      <Avatar fallback="C" size="md" color="blue" />
      <Avatar fallback="3" size="md" color="purple" />
    </div>
  ),
};

export const WithInfo: Story = {
  render: () => (
    <AvatarWithInfo
      name="John Smith"
      karma={1234}
      avatarProps={{ fallback: "J", size: "md", color: "blue" }}
    />
  ),
};

export const WithInfoSmall: Story = {
  render: () => (
    <AvatarWithInfo
      name="Anna Johnson"
      karma={567}
      avatarProps={{ fallback: "A", size: "sm", color: "green" }}
    />
  ),
};

export const WithInfoLarge: Story = {
  render: () => (
    <AvatarWithInfo
      name="Michael Brown"
      karma={9876}
      avatarProps={{ fallback: "M", size: "lg", color: "purple" }}
    />
  ),
};

export const WithInfoZeroKarma: Story = {
  render: () => (
    <AvatarWithInfo
      name="Lisa Williams"
      karma={0}
      avatarProps={{ fallback: "L", size: "md", color: "pink" }}
    />
  ),
};

export const WithInfoHugeKarma: Story = {
  render: () => (
    <AvatarWithInfo
      name="Lisa Williams"
      karma={20375029}
      avatarProps={{ fallback: "L", size: "md", color: "pink" }}
    />
  ),
};

export const WithInfoVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <AvatarWithInfo
        name="John Smith"
        karma={1234}
        avatarProps={{ fallback: "J", color: "red" }}
      />
      <AvatarWithInfo
        name="Anna Johnson"
        karma={567}
        avatarProps={{ fallback: "A", color: "emerald" }}
      />
      <AvatarWithInfo
        name="Michael Brown"
        karma={9876}
        avatarProps={{ fallback: "M", color: "indigo" }}
      />
    </div>
  ),
};
