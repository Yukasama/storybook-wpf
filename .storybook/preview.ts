/* eslint-disable sonarjs/todo-tag */

import type { Preview } from '@storybook/nextjs-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import en from '../messages/en.json';
import '../src/app/globals.css';

const preview: Preview = {
  initialGlobals: {
    locale: 'en',

    // Labels shown in the toolbar
    locales: {
      en: 'English',
      // de: 'Deutsch',
      // fr: 'Français',
      // es: 'Español',
      // it: 'Italiano',
      // nl: 'Nederlands',
      // pt: 'Português',
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    // For stories that use client-side routing, like the Navigation
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
    nextIntl: {
      defaultLocale: 'en',
      messagesByLocale: {
        en,
        // de,
        // es,
        // fr,
        // it,
        // nl,
        // pt,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        // Capitalized, as this name is used in the UI
        Light: '',
        Dark: 'dark',
      },
      defaultTheme: 'Light',
    }),
  ],
};

export default preview;
