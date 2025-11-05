import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Ban, Building2, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="all" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-4 space-y-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm">12 total tasks</p>
        </div>
      </TabsContent>
      <TabsContent value="active" className="mt-4 space-y-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm">8 active tasks</p>
        </div>
      </TabsContent>
      <TabsContent value="completed" className="mt-4 space-y-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm">4 completed tasks</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="friends" className="w-[350px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="friends">
          <Users className="mr-2 h-4 w-4" />
          Friends
        </TabsTrigger>
        <TabsTrigger value="institution">
          <Building2 className="mr-2 h-4 w-4" />
          Institution
        </TabsTrigger>
        <TabsTrigger value="blocked">
          <Ban className="mr-2 h-4 w-4" />
          Blocked
        </TabsTrigger>
      </TabsList>
      <TabsContent value="friends" className="mt-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm font-medium">23 Friends</p>
          <p className="mt-1 text-xs text-muted-foreground">
            People you follow
          </p>
        </div>
      </TabsContent>
      <TabsContent value="institution" className="mt-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm font-medium">156 Members</p>
          <p className="mt-1 text-xs text-muted-foreground">
            From your institution
          </p>
        </div>
      </TabsContent>
      <TabsContent value="blocked" className="mt-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm font-medium">2 Blocked</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Users you've blocked
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <Tabs defaultValue="friends" className="w-[250px]">
      <TabsList className="grid h-8 w-full grid-cols-3 rounded-full p-0">
        <TabsTrigger
          value="friends"
          className="h-8 rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-none data-[state=inactive]:hover:bg-sky-500/10"
          aria-label="Friends"
        >
          <Users className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger
          value="institution"
          className="h-8 rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-none data-[state=inactive]:hover:bg-sky-500/10"
          aria-label="Institution"
        >
          <Building2 className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger
          value="blocked"
          className="h-8 rounded-full data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-none data-[state=inactive]:hover:bg-red-500/10"
          aria-label="Blocked"
        >
          <Ban className="h-4 w-4" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <Tabs defaultValue="success" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger
          value="success"
          className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
        >
          Success
        </TabsTrigger>
        <TabsTrigger
          value="warning"
          className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
        >
          Warning
        </TabsTrigger>
        <TabsTrigger
          value="error"
          className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
        >
          Error
        </TabsTrigger>
      </TabsList>
      <TabsContent value="success" className="mt-4">
        <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4">
          <p className="text-sm font-medium text-green-700 dark:text-green-400">
            Operation successful
          </p>
          <p className="mt-1 text-xs text-green-600 dark:text-green-500">
            All systems operational
          </p>
        </div>
      </TabsContent>
      <TabsContent value="warning" className="mt-4">
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">
          <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
            Warning detected
          </p>
          <p className="mt-1 text-xs text-amber-600 dark:text-amber-500">
            Some issues need attention
          </p>
        </div>
      </TabsContent>
      <TabsContent value="error" className="mt-4">
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm font-medium text-red-700 dark:text-red-400">
            Error occurred
          </p>
          <p className="mt-1 text-xs text-red-600 dark:text-red-500">
            Action required
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="profile" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="mt-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm font-medium">Your Profile</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Manage your personal information
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings" className="mt-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm font-medium">Settings</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Configure your preferences
          </p>
        </div>
      </TabsContent>
      <TabsContent value="billing" className="mt-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm font-medium">Billing</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Upgrade to access billing
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};
