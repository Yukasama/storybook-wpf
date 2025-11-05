import type { LoginFlow, SuccessfulNativeLogin } from '@ory/client-fetch';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ResponseError } from '@ory/client-fetch';
import { expect, fn, userEvent, within } from '@storybook/test';
import { NextIntlClientProvider } from 'next-intl';
import { SignInForm } from '@/features/auth/sign-in-form';
import { frontendApi } from '@/lib/frontend-api';
import messages from '@/../messages/en.json';

const mockFlow: LoginFlow = {
  id: 'mock-flow-page-id',
  type: 'browser',
  state: 'choose_method',
  expires_at: new Date(Date.now() + 3600000),
  issued_at: new Date(),
  request_url: 'http://localhost:3000/sign-in',
  ui: {
    action: '/self-service/login',
    method: 'POST',
    nodes: [
      {
        type: 'input',
        group: 'default',
        attributes: {
          name: 'csrf_token',
          type: 'hidden',
          value: 'mock-csrf-token-page',
          required: true,
          disabled: false,
          node_type: 'input',
        },
        messages: [],
        meta: {},
      },
      {
        type: 'input',
        group: 'password',
        attributes: {
          name: 'identifier',
          type: 'email',
          required: true,
          disabled: false,
          node_type: 'input',
        },
        messages: [],
        meta: {},
      },
      {
        type: 'input',
        group: 'password',
        attributes: {
          name: 'password',
          type: 'password',
          required: true,
          disabled: false,
          node_type: 'input',
        },
        messages: [],
        meta: {},
      },
    ],
  },
  created_at: new Date(),
  updated_at: new Date(),
  refresh: false,
  requested_aal: 'aal1',
};

const mockLoginResponse: SuccessfulNativeLogin = {
  session: {
    id: 'mock-session-id',
    active: true,
    expires_at: new Date(Date.now() + 86400000),
    authenticated_at: new Date(),
    authenticator_assurance_level: 'aal1',
    authentication_methods: [
      {
        method: 'password',
        aal: 'aal1',
        completed_at: new Date(),
      },
    ],
    issued_at: new Date(),
    identity: {
      id: 'mock-user-id',
      schema_id: 'default',
      schema_url: '',
      state: 'active',
      state_changed_at: new Date(),
      traits: {
        email: 'page-user@example.com',
      },
      verifiable_addresses: [],
      recovery_addresses: [],
      metadata_public: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
  },
  session_token: 'mock-session-token',
};

const meta: Meta<typeof SignInForm> = {
  title: 'Pages/Auth/SignInPage',
  component: SignInForm,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className="-mt-36">
        <NextIntlClientProvider locale="en" messages={messages}>
          <Story />
        </NextIntlClientProvider>
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    initialFlow: mockFlow,
    returnTo: '/',
  },
  beforeEach: () => {
    frontendApi.updateLoginFlow = fn().mockResolvedValue(mockLoginResponse);
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PageLike: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId('sign-in-form')).toBeInTheDocument();

    await expect(canvas.getByTestId('sign-in-email')).toBeInTheDocument();

    await expect(canvas.getByTestId('sign-in-password')).toBeInTheDocument();

    const email = canvas.getByTestId('sign-in-email');
    const password = canvas.getByTestId('sign-in-password');

    await userEvent.type(email, 'page-user@example.com');

    await userEvent.type(password, 'PagePassword123!');

    const submit = canvas.getByTestId('sign-in-submit');

    await expect(submit).toBeEnabled();

    await userEvent.click(submit);

    await new Promise(resolve => setTimeout(resolve, 100));

    await expect(frontendApi.updateLoginFlow).toHaveBeenCalled();
  },
};

export const WeakPassword: Story = {
  args: {
    initialFlow: mockFlow,
  },
  beforeEach: () => {
    const weakPasswordFlow: LoginFlow = {
      ...mockFlow,
      id: 'weak-password-flow',
      ui: {
        ...mockFlow.ui,
        nodes: [
          {
            type: 'input',
            group: 'default',
            attributes: {
              name: 'csrf_token',
              type: 'hidden',
              value: 'mock-csrf-token-page',
              required: true,
              disabled: false,
              node_type: 'input',
            },
            messages: [],
            meta: {},
          },
          {
            type: 'input',
            group: 'password',
            attributes: {
              name: 'identifier',
              type: 'email',
              required: true,
              disabled: false,
              node_type: 'input',
            },
            messages: [],
            meta: {},
          },
          {
            type: 'input',
            group: 'password',
            attributes: {
              name: 'password',
              type: 'password',
              required: true,
              disabled: false,
              node_type: 'input',
            },
            messages: [
              {
                id: 4000005,
                text: 'The password is considered insecure. Please choose a different one.',
                type: 'error',
                context: {},
              },
            ],
            meta: {},
          },
        ],
      },
    };

    const error = new ResponseError(
      new Response(JSON.stringify(weakPasswordFlow), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    frontendApi.updateLoginFlow = fn().mockRejectedValue(error);
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const email = canvas.getByTestId('sign-in-email');
    const password = canvas.getByTestId('sign-in-password');

    await userEvent.type(email, 'user@example.com');

    await userEvent.type(password, '12345678');

    const submit = canvas.getByTestId('sign-in-submit');

    await userEvent.click(submit);

    await new Promise(resolve => setTimeout(resolve, 500));

    const passwordError = canvas.queryByText(/weak|policy/i);

    if (passwordError) {
      await expect(passwordError).toBeInTheDocument();
    }
  },
};

export const InvalidCredentials: Story = {
  args: {
    initialFlow: {
      ...mockFlow,
      id: 'invalid-credentials-flow',
      ui: {
        ...mockFlow.ui,
        messages: [
          {
            id: 4000006,
            text: 'The provided credentials are invalid.',
            type: 'error',
            context: {},
          },
        ],
      },
    },
  },
};
