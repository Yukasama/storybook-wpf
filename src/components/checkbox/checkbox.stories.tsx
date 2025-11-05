import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from '@storybook/test';
import Link from 'next/link';
import { useState } from 'react';
import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onCheckedChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).not.toBeChecked();
    await expect(checkbox).not.toBeDisabled();

    await userEvent.click(checkbox);

    await expect(checkbox).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true);

    await userEvent.click(checkbox);

    await expect(checkbox).not.toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenCalledWith(false);
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).toBeChecked();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    onCheckedChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).toBeDisabled();
    await expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);

    await expect(checkbox).not.toBeChecked();
    await expect(args.onCheckedChange).not.toHaveBeenCalled();
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).toBeDisabled();
    await expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);

    await expect(checkbox).toBeChecked();
  },
};

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={checked}
          onCheckedChange={value => setChecked(value as boolean)}
        />
        <label
          htmlFor="terms"
          className="cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    const label = canvas.getByText('Accept terms and conditions');

    await expect(checkbox).toBeInTheDocument();
    await expect(label).toBeInTheDocument();
    await expect(checkbox).not.toBeChecked();

    await userEvent.click(label);

    await expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);

    await expect(checkbox).not.toBeChecked();
  },
};

export const WithLongLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="flex max-w-md items-start space-x-2">
        <Checkbox
          id="terms-long"
          checked={checked}
          onCheckedChange={value => setChecked(value as boolean)}
          className="mt-1"
        />
        <label
          htmlFor="terms-long"
          className="cursor-pointer text-sm leading-relaxed font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the terms and conditions, privacy policy, and understand
          that my data will be processed according to the GDPR regulations.
        </label>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    const label = canvas.getByText(/I agree to the terms/i);

    await expect(checkbox).toBeInTheDocument();
    await expect(label).toBeInTheDocument();
    await expect(checkbox).not.toBeChecked();

    await userEvent.click(label);

    await expect(checkbox).toBeChecked();
  },
};

export const FormExample: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <form className="max-w-md space-y-4 rounded-lg border p-6">
        <h3 className="text-lg font-semibold">Sign Up</h3>

        <div className="space-y-2">
          <label htmlFor="signup-email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            className="w-full rounded-md border px-3 py-2"
            placeholder="email@example.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="signup-password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            className="w-full rounded-md border px-3 py-2"
            placeholder="********"
          />
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="signup-terms"
            checked={checked}
            onCheckedChange={value => setChecked(value as boolean)}
            className="mt-1"
          />
          <label
            htmlFor="signup-terms"
            className="cursor-pointer text-sm leading-relaxed"
          >
            By signing up, you agree to our{' '}
            <Link href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        <button
          type="submit"
          disabled={!checked}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Sign Up
        </button>
      </form>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    const submitButton = canvas.getByRole('button', { name: /sign up/i });

    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).not.toBeChecked();
    await expect(submitButton).toBeDisabled();

    await userEvent.click(checkbox);

    await expect(checkbox).toBeChecked();
    await expect(submitButton).toBeEnabled();

    await userEvent.click(checkbox);

    await expect(checkbox).not.toBeChecked();
    await expect(submitButton).toBeDisabled();
  },
};

export const MultipleCheckboxes: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: '1', label: 'Receive email notifications', checked: true },
      { id: '2', label: 'Receive SMS notifications', checked: false },
      { id: '3', label: 'Receive push notifications', checked: true },
      { id: '4', label: 'Marketing emails', checked: false },
    ]);

    const handleToggle = (id: string) => {
      setItems(
        items.map(item =>
          item.id === id ? { ...item, checked: !item.checked } : item,
        ),
      );
    };

    return (
      <div className="max-w-md space-y-3 rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Notification Preferences</h3>
        {items.map(item => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
              id={item.id}
              checked={item.checked}
              onCheckedChange={() => handleToggle(item.id)}
            />
            <label
              htmlFor={item.id}
              className="cursor-pointer text-sm font-medium"
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkboxes = canvas.getAllByRole('checkbox');

    await expect(checkboxes).toHaveLength(4);

    await expect(checkboxes[0]).toBeChecked();
    await expect(checkboxes[1]).not.toBeChecked();
    await expect(checkboxes[2]).toBeChecked();
    await expect(checkboxes[3]).not.toBeChecked();

    await userEvent.click(checkboxes[1]);

    await expect(checkboxes[1]).toBeChecked();

    await userEvent.click(checkboxes[0]);

    await expect(checkboxes[0]).not.toBeChecked();

    const smsLabel = canvas.getByText('Receive SMS notifications');
    await userEvent.click(smsLabel);

    await expect(checkboxes[1]).not.toBeChecked();
  },
};
