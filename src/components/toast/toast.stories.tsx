import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../button/button';
import { Toaster } from './toaster';

const meta = {
  title: 'Components/Toast',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast.success('Email verified successfully', {
          description: 'You can now upload documents',
          icon: <CheckCircle2 className="h-5 w-5" />,
        })}
    >
      Show Success Toast
    </Button>
  ),
};

export const EmailNotVerified: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast.error('Email not verified', {
          description: 'Please verify your email before uploading',
          icon: <XCircle className="h-5 w-5" />,
        })}
    >
      Show Error Toast
    </Button>
  ),
};

export const Warning: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast.warning('Email verification pending', {
          description: 'Check your inbox for the verification email',
          icon: <AlertTriangle className="h-5 w-5" />,
        })}
    >
      Show Warning Toast
    </Button>
  ),
};

export const MailSent: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast.info('Verification email sent', {
          description: 'Please check your inbox',
          icon: <Info className="h-5 w-5" />,
        })}
    >
      Show Info Toast
    </Button>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast.error('Email not verified', {
          description: 'Please verify your email to continue',
          icon: <XCircle className="h-5 w-5" />,
          action: {
            label: 'Resend',
            onClick: () => toast.info('Verification email sent'),
          },
        })}
    >
      Show Toast With Action
    </Button>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Button
        onClick={() =>
          toast.success('Success', {
            description: 'This is a success message',
            icon: <CheckCircle2 className="h-5 w-5" />,
          })}
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.error('Error', {
            description: 'This is an error message',
            icon: <XCircle className="h-5 w-5" />,
          })}
      >
        Error
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.warning('Warning', {
            description: 'This is a warning message',
            icon: <AlertTriangle className="h-5 w-5" />,
          })}
      >
        Warning
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.info('Info', {
            description: 'This is an info message',
            icon: <Info className="h-5 w-5" />,
          })}
      >
        Info
      </Button>
    </div>
  ),
};
