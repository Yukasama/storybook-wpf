'use client';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { InputOTP } from './input-otp';

const meta: Meta<typeof InputOTP> = {
  title: 'Components/Input OTP',
  component: InputOTP,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    length: {
      control: { type: 'number', min: 3, max: 8, step: 1 },
    },
    value: {
      control: false,
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
    label: 'Verification code',
    length: 6,
    value: '',
  },
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [code, setCode] = useState(args.value);

    return (
      <InputOTP
        {...args}
        value={code}
        onChange={(next) => {
          setCode(next);
          args.onChange?.(next);
        }}
        onComplete={(next) => {
          args.onComplete?.(next);
        }}
      />
    );
  },
};

export const WithHint: Story = {
  args: {
    hint: 'Enter the 6-digit code we emailed you.',
  },
};

export const WithError: Story = {
  args: {
    error: 'The code you entered is invalid.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
