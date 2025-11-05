import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Calendar,
  Copy,
  Download,
  Info,
  Save,
  Settings,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/button/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">
          <Info className="h-4 w-4" />
          Information
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Click to view more details</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const IconButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" variant="ghost">
          <Settings className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Settings</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8">
      <div />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline">
            <Calendar className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Top position</p>
        </TooltipContent>
      </Tooltip>
      <div />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline">
            <Calendar className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Left position</p>
        </TooltipContent>
      </Tooltip>
      <div />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline">
            <Calendar className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Right position</p>
        </TooltipContent>
      </Tooltip>

      <div />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline">
            <Calendar className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Bottom position</p>
        </TooltipContent>
      </Tooltip>
      <div />
    </div>
  ),
};

export const ActionButtons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon-sm" variant="ghost">
            <Copy className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy to clipboard</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon-sm" variant="ghost">
            <Download className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Download file</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon-sm" variant="ghost">
            <Save className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Save changes</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon-sm" variant="ghost">
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-red-500">Delete permanently</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const WithKeyboardShortcut: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">
          <Save className="h-4 w-4" />
          Save
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="flex items-center gap-2">
          <span>Save document</span>
          <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
            <span className="text-xs">⌘</span>S
          </kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
};

export const DetailedInformation: Story = {
  render: () => (
    <div className="py-12">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            <Info className="h-4 w-4" />
            Storage Info
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-1">
            <p className="font-semibold">Storage Usage</p>
            <p className="text-xs text-muted-foreground">
              You've used 4.2 GB of your 10 GB storage limit. Upgrade to get
              more space.
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const CustomOffset: Story = {
  render: () => (
    <div className="flex gap-4 py-6">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Default offset
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>5px offset (default)</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Large offset
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={20}>
          <p>20px offset</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};
