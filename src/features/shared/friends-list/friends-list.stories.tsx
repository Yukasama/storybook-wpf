import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { FriendsListProps } from "./friends-list";
import { NextIntlClientProvider } from "next-intl";
import { FriendsList } from "./friends-list";
import messages from "@/../messages/en.json";

const meta = {
  title: "Features/FriendsList",
  component: FriendsList,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages}>
        <div className="relative h-screen w-full">
          <div className="absolute inset-0 bg-background">
            <div className="container mx-auto p-8">
              <h1 className="mb-4 text-2xl font-bold">Main Content Area</h1>
              <p className="text-muted-foreground">
                Hover over the right side to see the friends list expand.
              </p>
            </div>
          </div>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
} satisfies Meta<typeof FriendsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The default state with a normal amount of friends (8 friends). Hover over the list to expand and see friend details.",
      },
    },
  },
};

export const NoFriends: Story = {
  args: {
    friends: [],
  } satisfies FriendsListProps,
  parameters: {
    docs: {
      description: {
        story:
          "Empty state when the user has no friends yet. Shows a message when expanded.",
      },
    },
  },
};

export const ManyFriends: Story = {
  args: {
    friends: [
      {
        id: "1",
        name: "Anna Smith",
        karma: 1250,
        avatarFallback: "AS",
        avatarColor: "blue",
      },
      {
        id: "2",
        name: "Marcus Miller",
        karma: 980,
        avatarFallback: "MM",
        avatarColor: "green",
      },
      {
        id: "3",
        name: "Lisa White",
        karma: 1450,
        avatarFallback: "LW",
        avatarColor: "purple",
      },
      {
        id: "4",
        name: "Tom Fisher",
        karma: 720,
        avatarFallback: "TF",
        avatarColor: "orange",
      },
      {
        id: "5",
        name: "Sarah Knight",
        karma: 1120,
        avatarFallback: "SK",
        avatarColor: "pink",
      },
      {
        id: "6",
        name: "James Burton",
        karma: 890,
        avatarFallback: "JB",
        avatarColor: "cyan",
      },
      {
        id: "7",
        name: "Nancy Hayes",
        karma: 1340,
        avatarFallback: "NH",
        avatarColor: "indigo",
      },
      {
        id: "8",
        name: "Paul Richards",
        karma: 650,
        avatarFallback: "PR",
        avatarColor: "emerald",
      },
      {
        id: "9",
        name: "Jessica Snyder",
        karma: 1580,
        avatarFallback: "JS",
        avatarColor: "blue",
      },
      {
        id: "10",
        name: "Frank Wallace",
        karma: 940,
        avatarFallback: "FW",
        avatarColor: "green",
      },
      {
        id: "11",
        name: "Emma Baker",
        karma: 1270,
        avatarFallback: "EB",
        avatarColor: "purple",
      },
      {
        id: "12",
        name: "Liam Scott",
        karma: 810,
        avatarFallback: "LS",
        avatarColor: "orange",
      },
      {
        id: "13",
        name: "Morgan Harris",
        karma: 1190,
        avatarFallback: "MH",
        avatarColor: "pink",
      },
      {
        id: "14",
        name: "Nathan Moore",
        karma: 1050,
        avatarFallback: "NM",
        avatarColor: "cyan",
      },
      {
        id: "15",
        name: "Sophie Cook",
        karma: 1420,
        avatarFallback: "SC",
        avatarColor: "indigo",
      },
      {
        id: "16",
        name: "Lewis Bennett",
        karma: 780,
        avatarFallback: "LB",
        avatarColor: "emerald",
      },
      {
        id: "17",
        name: "Hannah Wolf",
        karma: 1310,
        avatarFallback: "HW",
        avatarColor: "blue",
      },
      {
        id: "18",
        name: "Ben Sanders",
        karma: 920,
        avatarFallback: "BS",
        avatarColor: "green",
      },
      {
        id: "19",
        name: "Lauren Foster",
        karma: 1150,
        avatarFallback: "LZ",
        avatarColor: "purple",
      },
      {
        id: "20",
        name: "Tyler King",
        karma: 870,
        avatarFallback: "TK",
        avatarColor: "orange",
      },
      {
        id: "21",
        name: "Clara Brown",
        karma: 1380,
        avatarFallback: "CB",
        avatarColor: "pink",
      },
      {
        id: "22",
        name: "Jack Lehman",
        karma: 690,
        avatarFallback: "JL",
        avatarColor: "cyan",
      },
      {
        id: "23",
        name: "Marie Warner",
        karma: 1240,
        avatarFallback: "MW",
        avatarColor: "indigo",
      },
      {
        id: "24",
        name: "Luke Smith",
        karma: 960,
        avatarFallback: "LS",
        avatarColor: "emerald",
      },
      {
        id: "25",
        name: "Amy Long",
        karma: 1470,
        avatarFallback: "AL",
        avatarColor: "blue",
      },
    ],
  } satisfies FriendsListProps,
  parameters: {
    docs: {
      description: {
        story:
          "List with many friends (25 friends) that requires scrolling. The custom scrollbar appears when hovering over the expanded list.",
      },
    },
  },
};
