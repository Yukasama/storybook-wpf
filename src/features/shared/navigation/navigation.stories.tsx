import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NextIntlClientProvider } from "next-intl";
import { Navigation } from "./navigation";
import messages from "@/../messages/en.json";

const meta = {
  title: "Features/Navigation",
  component: Navigation,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages}>
        <Story />
        <div className="h-22" />
      </NextIntlClientProvider>
    ),
  ],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockSessionLoggedIn = {
  identity: {
    id: "123",
    email: "hans.mueller@example.com",
    emailVerified: true,
  },
  authenticated_at: new Date().toISOString(),
  expires_at: new Date(Date.now() + 86400000).toISOString(),
  issued_at: new Date().toISOString(),
  user: {
    id: "123",
    name: "Hans Müller",
    email: "hans.mueller@example.com",
    institutionId: "inst-1",
    isProfilePrivate: false,
    institution: {
      id: "inst-1",
      name: "Universität München",
    },
    karma: 1250,
    avatarFallback: "HM",
    avatarColor: "blue" as const,
  },
};

export const LoggedIn: Story = {
  args: {
    session: mockSessionLoggedIn,
  },
};

export const LoggedOut: Story = {
  args: {
    session: undefined,
  },
};

export const WithHighKarma: Story = {
  args: {
    session: {
      ...mockSessionLoggedIn,
      user: {
        ...mockSessionLoggedIn.user,
        karma: 9999999,
      },
    },
  },
};

export const WithLongName: Story = {
  args: {
    session: {
      ...mockSessionLoggedIn,
      user: {
        ...mockSessionLoggedIn.user,
        name: "Dr. Hans-Peter Müller-Schmidt",
        avatarFallback: "DH",
      },
    },
  },
};
