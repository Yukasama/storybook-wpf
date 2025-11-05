import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Alert } from './alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning'],
      description: 'The visual style variant of the alert',
    },
    message: {
      control: 'text',
      description: 'The message text to display in the alert',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    message: 'This is a default alert message with information.',
  },
};

export const ErrorAlert: Story = {
  args: {
    variant: 'error',
    message: 'An error occurred while processing your request.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    message: 'Your changes have been saved successfully!',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    message: 'Please review your input before continuing.',
  },
};

export const LongMessage: Story = {
  args: {
    variant: 'default',
    message:
      'This is a much longer alert message to demonstrate how the component handles extended text content. It should wrap gracefully and maintain readability across multiple lines while keeping the icon aligned at the top.',
  },
};

export const AuthenticationExamples: Story = {
  args: {
    message: '',
  },
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: '600px' }}>
      <Alert variant="error" message="Invalid email or password. Please try again." />
      <Alert variant="success" message="Password changed successfully!" />
      <Alert
        variant="default"
        message="A verification code has been sent to your email address."
      />
      <Alert variant="warning" message="Your session will expire in 5 minutes." />
      <Alert variant="success" message="Email address verified successfully!" />
    </div>
  ),
};

export const FormValidationExamples: Story = {
  args: {
    message: '',
  },
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: '600px' }}>
      <Alert variant="error" message="Please fill in all required fields." />
      <Alert variant="error" message="Email address is not valid." />
      <Alert variant="warning" message="Password must be at least 8 characters long." />
      <Alert variant="success" message="Form submitted successfully!" />
    </div>
  ),
};

export const SystemMessages: Story = {
  args: {
    message: '',
  },
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: '600px' }}>
      <Alert variant="default" message="System maintenance scheduled for tonight at 2:00 AM." />
      <Alert variant="warning" message="You have reached 80% of your storage quota." />
      <Alert variant="error" message="Connection lost. Attempting to reconnect..." />
      <Alert variant="success" message="Connection restored successfully." />
    </div>
  ),
};

export const WithCustomClassName: Story = {
  args: {
    variant: 'success',
    message: 'Custom styled alert with additional classes',
    className: 'shadow-lg border-2',
  },
};
