import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from '@storybook/test';
import { Lock, Mail } from 'lucide-react';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
    },
    error: {
      control: 'text',
    },
    hint: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    label: 'E-Mail',
    placeholder: 'example@mail.com',
    leadingIcon: <Mail size={18} />,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'email',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/e-mail/i);

    await expect(input).toBeInTheDocument();
    await expect(input).toHaveAttribute('type', 'email');
    await expect(input).toHaveAttribute('placeholder', 'example@mail.com');

    await userEvent.type(input, 'user@example.com');

    await expect(input).toHaveValue('user@example.com');

    await userEvent.clear(input);

    await expect(input).toHaveValue('');
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '•••••••••••',
    leadingIcon: <Lock size={18} />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('•••••••••••');

    await expect(input).toHaveAttribute('type', 'password');

    await userEvent.type(input, 'SecurePassword123!');

    await expect(input).toHaveValue('SecurePassword123!');

    // Find and click toggle button to reveal password
    const toggleButton = canvas.getByRole('button', { name: /show password/i });
    await userEvent.click(toggleButton);

    await expect(input).toHaveAttribute('type', 'text');

    // Click again to hide password
    const hideButton = canvas.getByRole('button', { name: /hide password/i });
    await userEvent.click(hideButton);

    await expect(input).toHaveAttribute('type', 'password');
  },
};

export const WithFeedback: Story = {
  args: {
    type: 'email',
    hint: 'We\'ll never share your email.',
  },
};

export const InvalidField: Story = {
  args: {
    type: 'email',
    error: 'Please enter a valid email address.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/e-mail/i);

    const errorMessage = canvas.getByText(/please enter a valid email address/i);

    await expect(errorMessage).toBeInTheDocument();

    await expect(input).toHaveAccessibleDescription(/please enter a valid email address/i);

    await userEvent.type(input, 'valid@example.com');

    await expect(input).toHaveValue('valid@example.com');
  },
};

export const ValidPassword: Story = {
  args: {
    label: 'Password',
    type: 'password',
    isSuccess: true,
    placeholder: 'Enter secure password',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Enter secure password');

    await expect(input).toHaveAttribute('type', 'password');

    await userEvent.type(input, 'ValidPass123!');

    await expect(input).toHaveValue('ValidPass123!');
  },
};

export const Disabled: Story = {
  args: {
    type: 'email',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/e-mail/i);

    await expect(input).toBeDisabled();

    await userEvent.type(input, 'test@example.com');

    await expect(input).toHaveValue('');
  },
};
