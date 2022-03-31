// @flow strict
import { act, render } from '@testing-library/react';
import ColorSchemeProvider, { useColorScheme } from './ColorSchemeProvider.js';

function ThemeAwareComponent() {
  const theme = useColorScheme();
  return <div>{theme.name}</div>;
}

describe('ColorSchemeProvider', () => {
  it('renders child content in a div', () => {
    const { container } = render(<ColorSchemeProvider>Child 1</ColorSchemeProvider>);
    expect(container.querySelector('div')).toMatchInlineSnapshot(`
        <div>
          Child 1
        </div>
      `);
  });
  it('renders styling for light mode when no color scheme specified', () => {
    const { container } = render(<ColorSchemeProvider>Content</ColorSchemeProvider>);
    expect(container.querySelector('style')).toMatchInlineSnapshot(`
      <style>
        :root {
        --g-colorRed0: #ff5247;
        --g-colorRed100: #e60023;
        --g-colorRed100Active: #a3081a;
        --g-colorRed100Hovered: #ad081b;
        --g-colorGray0: #fff;
        --g-colorGray0Active: #e0e0e0;
        --g-colorGray0Hovered: #f0f0f0;
        --g-colorGray50: #fff;
        --g-colorGray100: #efefef;
        --g-colorGray100Active: #dadada;
        --g-colorGray100Hovered: #e2e2e2;
        --g-colorGray150: #ddd;
        --g-colorGray150Hovered: #d0d0d0;
        --g-colorGray200: #767676;
        --g-colorGray200Active: #828282;
        --g-colorGray200Hovered: #878787;
        --g-colorGray300: #111;
        --g-colorGray400: #000;
        --g-colorTransparentDarkGray: rgba(51, 51, 51, 0.8);
        --g-colorTransparentGray60: rgba(0, 0, 0, 0.06);
        --g-colorTransparentGray100: rgba(0, 0, 0, 0.1);
        --g-colorTransparentGray500: rgba(0, 0, 0, 0.1);
        --g-colorTransparentWhite: rgba(255, 255, 255, 0.8);
        --color-text-default: #111111;
        --color-text-subtle: #767676;
        --color-text-success: #005f3e;
        --color-text-error: #cc0000;
        --color-text-warning: #bd5b00;
        --color-text-inverse: #ffffff;
        --color-text-shopping: #0074e8;
        --color-text-icon-default: #111111;
        --color-text-icon-subtle: #767676;
        --color-text-icon-success: #005f3e;
        --color-text-icon-error: #cc0000;
        --color-text-icon-warning: #bd5b00;
        --color-text-icon-inverse: #ffffff;
        --color-background-default: #ffffff;
        --color-background-info-base: #0074e8;
        --color-background-error-base: #cc0000;
        --color-background-warning-base: #bd5b00;
        --color-background-success-base: #008753;
        --color-background-shopping: #0074e8;
        --color-background-secondary-base: #e9e9e9;
        --color-background-tertiary-base: #767676;
        --color-background-selected-base: #111111;
        --color-background-inverse-base: #111111;
        --color-background-education: #0074e8;
        --color-background-elevation-accent: #f1f1f1;
        --color-background-elevation-floating: rgba(0, 0, 0, 0);
        --color-background-elevation-raised: rgba(0, 0, 0, 0);
        --color-border-container: #cdcdcd;
        --color-border-default: #767676;
        --elevation-floating: 0 0 8px rgba(0, 0, 0, 0.10);
        --elevation-raised-top: 0 2px 8px rgba(0, 0, 0, 0.12);
        --elevation-raised-bottom: 0 -2px 8px rgba(0, 0, 0, 0.12);
       }
      </style>
    `);
  });
  it('renders styling for light mode when specified', () => {
    const { container } = render(
      <ColorSchemeProvider colorScheme="light">Content</ColorSchemeProvider>,
    );
    expect(container.querySelector('style')).toMatchInlineSnapshot(`
      <style>
        :root {
        --g-colorRed0: #ff5247;
        --g-colorRed100: #e60023;
        --g-colorRed100Active: #a3081a;
        --g-colorRed100Hovered: #ad081b;
        --g-colorGray0: #fff;
        --g-colorGray0Active: #e0e0e0;
        --g-colorGray0Hovered: #f0f0f0;
        --g-colorGray50: #fff;
        --g-colorGray100: #efefef;
        --g-colorGray100Active: #dadada;
        --g-colorGray100Hovered: #e2e2e2;
        --g-colorGray150: #ddd;
        --g-colorGray150Hovered: #d0d0d0;
        --g-colorGray200: #767676;
        --g-colorGray200Active: #828282;
        --g-colorGray200Hovered: #878787;
        --g-colorGray300: #111;
        --g-colorGray400: #000;
        --g-colorTransparentDarkGray: rgba(51, 51, 51, 0.8);
        --g-colorTransparentGray60: rgba(0, 0, 0, 0.06);
        --g-colorTransparentGray100: rgba(0, 0, 0, 0.1);
        --g-colorTransparentGray500: rgba(0, 0, 0, 0.1);
        --g-colorTransparentWhite: rgba(255, 255, 255, 0.8);
        --color-text-default: #111111;
        --color-text-subtle: #767676;
        --color-text-success: #005f3e;
        --color-text-error: #cc0000;
        --color-text-warning: #bd5b00;
        --color-text-inverse: #ffffff;
        --color-text-shopping: #0074e8;
        --color-text-icon-default: #111111;
        --color-text-icon-subtle: #767676;
        --color-text-icon-success: #005f3e;
        --color-text-icon-error: #cc0000;
        --color-text-icon-warning: #bd5b00;
        --color-text-icon-inverse: #ffffff;
        --color-background-default: #ffffff;
        --color-background-info-base: #0074e8;
        --color-background-error-base: #cc0000;
        --color-background-warning-base: #bd5b00;
        --color-background-success-base: #008753;
        --color-background-shopping: #0074e8;
        --color-background-secondary-base: #e9e9e9;
        --color-background-tertiary-base: #767676;
        --color-background-selected-base: #111111;
        --color-background-inverse-base: #111111;
        --color-background-education: #0074e8;
        --color-background-elevation-accent: #f1f1f1;
        --color-background-elevation-floating: rgba(0, 0, 0, 0);
        --color-background-elevation-raised: rgba(0, 0, 0, 0);
        --color-border-container: #cdcdcd;
        --color-border-default: #767676;
        --elevation-floating: 0 0 8px rgba(0, 0, 0, 0.10);
        --elevation-raised-top: 0 2px 8px rgba(0, 0, 0, 0.12);
        --elevation-raised-bottom: 0 -2px 8px rgba(0, 0, 0, 0.12);
       }
      </style>
    `);
  });
  it('renders styling for dark mode when specified', () => {
    const { container } = render(
      <ColorSchemeProvider colorScheme="dark">Content</ColorSchemeProvider>,
    );
    expect(container.querySelector('style')).toMatchInlineSnapshot(`
      <style>
        :root {
        --g-colorRed0: #e60023;
        --g-colorRed100: #ff5247;
        --g-colorRed100Active: #b8001b;
        --g-colorRed100Hovered: #cf001f;
        --g-colorGray0: #030303;
        --g-colorGray0Active: #1f1f1f;
        --g-colorGray0Hovered: #121212;
        --g-colorGray50: #212121;
        --g-colorGray100: #404040;
        --g-colorGray100Active: #666;
        --g-colorGray100Hovered: #535353;
        --g-colorGray150: #585858;
        --g-colorGray150Hovered: #535353;
        --g-colorGray200: #ababab;
        --g-colorGray200Active: #9b9b9b;
        --g-colorGray200Hovered: #919191;
        --g-colorGray300: #efefef;
        --g-colorGray400: #fff;
        --g-colorTransparentDarkGray: rgba(255, 255, 255, 0.8);
        --g-colorTransparentGray60: rgba(250, 250, 250, 0.5);
        --g-colorTransparentGray100: rgba(250, 250, 250, 0.6);
        --g-colorTransparentGray500: rgba(0, 0, 0, 0.5);
        --g-colorTransparentWhite: rgba(51, 51, 51, 0.8);
        --color-text-default: #ffffff;
        --color-text-subtle: #a5a5a5;
        --color-text-success: #39d377;
        --color-text-error: #eb4242;
        --color-text-warning: #e18d00;
        --color-text-inverse: #111111;
        --color-text-shopping: #75bfff;
        --color-text-icon-default: #ffffff;
        --color-text-icon-subtle: #a5a5a5;
        --color-text-icon-success: #39d377;
        --color-text-icon-error: #eb4242;
        --color-text-icon-warning: #e18d00;
        --color-text-icon-inverse: #111111;
        --color-background-default: #111111;
        --color-background-info-base: #75bfff;
        --color-background-error-base: #f47171;
        --color-background-warning-base: #fdc900;
        --color-background-success-base: #6bec8c;
        --color-background-shopping: #75bfff;
        --color-background-secondary-base: #767676;
        --color-background-tertiary-base: #cdcdcd;
        --color-background-selected-base: #e9e9e9;
        --color-background-inverse-base: #f9f9f9;
        --color-background-education: #75bfff;
        --color-background-elevation-accent: #191919;
        --color-background-elevation-floating: #2b2b2b;
        --color-background-elevation-raised: #4a4a4a;
        --color-border-container: #4a4a4a;
        --color-border-default: #cdcdcd;
        --elevation-floating: none;
        --elevation-raised-top: 0 0.5px 0 #f9f9f9;
        --elevation-raised-bottom: 0 -0.5px 0 #f9f9f9;
       }
      </style>
    `);
  });
  it('renders styling with media query when userPreference', () => {
    const { container } = render(
      <ColorSchemeProvider colorScheme="userPreference">Content</ColorSchemeProvider>,
    );
    expect(container.querySelector('style')).toMatchInlineSnapshot(`
      <style>
        @media(prefers-color-scheme: dark) {
        :root {
        --g-colorRed0: #e60023;
        --g-colorRed100: #ff5247;
        --g-colorRed100Active: #b8001b;
        --g-colorRed100Hovered: #cf001f;
        --g-colorGray0: #030303;
        --g-colorGray0Active: #1f1f1f;
        --g-colorGray0Hovered: #121212;
        --g-colorGray50: #212121;
        --g-colorGray100: #404040;
        --g-colorGray100Active: #666;
        --g-colorGray100Hovered: #535353;
        --g-colorGray150: #585858;
        --g-colorGray150Hovered: #535353;
        --g-colorGray200: #ababab;
        --g-colorGray200Active: #9b9b9b;
        --g-colorGray200Hovered: #919191;
        --g-colorGray300: #efefef;
        --g-colorGray400: #fff;
        --g-colorTransparentDarkGray: rgba(255, 255, 255, 0.8);
        --g-colorTransparentGray60: rgba(250, 250, 250, 0.5);
        --g-colorTransparentGray100: rgba(250, 250, 250, 0.6);
        --g-colorTransparentGray500: rgba(0, 0, 0, 0.5);
        --g-colorTransparentWhite: rgba(51, 51, 51, 0.8);
        --color-text-default: #ffffff;
        --color-text-subtle: #a5a5a5;
        --color-text-success: #39d377;
        --color-text-error: #eb4242;
        --color-text-warning: #e18d00;
        --color-text-inverse: #111111;
        --color-text-shopping: #75bfff;
        --color-text-icon-default: #ffffff;
        --color-text-icon-subtle: #a5a5a5;
        --color-text-icon-success: #39d377;
        --color-text-icon-error: #eb4242;
        --color-text-icon-warning: #e18d00;
        --color-text-icon-inverse: #111111;
        --color-background-default: #111111;
        --color-background-info-base: #75bfff;
        --color-background-error-base: #f47171;
        --color-background-warning-base: #fdc900;
        --color-background-success-base: #6bec8c;
        --color-background-shopping: #75bfff;
        --color-background-secondary-base: #767676;
        --color-background-tertiary-base: #cdcdcd;
        --color-background-selected-base: #e9e9e9;
        --color-background-inverse-base: #f9f9f9;
        --color-background-education: #75bfff;
        --color-background-elevation-accent: #191919;
        --color-background-elevation-floating: #2b2b2b;
        --color-background-elevation-raised: #4a4a4a;
        --color-border-container: #4a4a4a;
        --color-border-default: #cdcdcd;
        --elevation-floating: none;
        --elevation-raised-top: 0 0.5px 0 #f9f9f9;
        --elevation-raised-bottom: 0 -0.5px 0 #f9f9f9;
       }
      }
      </style>
    `);
  });
  it('renders styling with a custom class if has an id', () => {
    const { container } = render(<ColorSchemeProvider id="testId">Content</ColorSchemeProvider>);
    expect(container.querySelector('.__gestaltThemetestId')).toBeTruthy();
    expect(container.querySelector('style')).toMatchInlineSnapshot(`
      <style>
        .__gestaltThemetestId {
        --g-colorRed0: #ff5247;
        --g-colorRed100: #e60023;
        --g-colorRed100Active: #a3081a;
        --g-colorRed100Hovered: #ad081b;
        --g-colorGray0: #fff;
        --g-colorGray0Active: #e0e0e0;
        --g-colorGray0Hovered: #f0f0f0;
        --g-colorGray50: #fff;
        --g-colorGray100: #efefef;
        --g-colorGray100Active: #dadada;
        --g-colorGray100Hovered: #e2e2e2;
        --g-colorGray150: #ddd;
        --g-colorGray150Hovered: #d0d0d0;
        --g-colorGray200: #767676;
        --g-colorGray200Active: #828282;
        --g-colorGray200Hovered: #878787;
        --g-colorGray300: #111;
        --g-colorGray400: #000;
        --g-colorTransparentDarkGray: rgba(51, 51, 51, 0.8);
        --g-colorTransparentGray60: rgba(0, 0, 0, 0.06);
        --g-colorTransparentGray100: rgba(0, 0, 0, 0.1);
        --g-colorTransparentGray500: rgba(0, 0, 0, 0.1);
        --g-colorTransparentWhite: rgba(255, 255, 255, 0.8);
        --color-text-default: #111111;
        --color-text-subtle: #767676;
        --color-text-success: #005f3e;
        --color-text-error: #cc0000;
        --color-text-warning: #bd5b00;
        --color-text-inverse: #ffffff;
        --color-text-shopping: #0074e8;
        --color-text-icon-default: #111111;
        --color-text-icon-subtle: #767676;
        --color-text-icon-success: #005f3e;
        --color-text-icon-error: #cc0000;
        --color-text-icon-warning: #bd5b00;
        --color-text-icon-inverse: #ffffff;
        --color-background-default: #ffffff;
        --color-background-info-base: #0074e8;
        --color-background-error-base: #cc0000;
        --color-background-warning-base: #bd5b00;
        --color-background-success-base: #008753;
        --color-background-shopping: #0074e8;
        --color-background-secondary-base: #e9e9e9;
        --color-background-tertiary-base: #767676;
        --color-background-selected-base: #111111;
        --color-background-inverse-base: #111111;
        --color-background-education: #0074e8;
        --color-background-elevation-accent: #f1f1f1;
        --color-background-elevation-floating: rgba(0, 0, 0, 0);
        --color-background-elevation-raised: rgba(0, 0, 0, 0);
        --color-border-container: #cdcdcd;
        --color-border-default: #767676;
        --elevation-floating: 0 0 8px rgba(0, 0, 0, 0.10);
        --elevation-raised-top: 0 2px 8px rgba(0, 0, 0, 0.12);
        --elevation-raised-bottom: 0 -2px 8px rgba(0, 0, 0, 0.12);
       }
      </style>
    `);
  });
});
describe('useColorScheme', () => {
  it('uses light mode theme when not in theme provider', () => {
    const { getByText } = render(<ThemeAwareComponent />);
    expect(getByText('lightMode')).toBeTruthy();
  });
  it('uses light mode theme when specified', () => {
    const { getByText } = render(
      <ColorSchemeProvider colorScheme="light">
        <ThemeAwareComponent />
      </ColorSchemeProvider>,
    );
    expect(getByText('lightMode')).toBeTruthy();
  });
  it('uses dark mode theme when specified', () => {
    const { getByText } = render(
      <ColorSchemeProvider colorScheme="dark">
        <ThemeAwareComponent />
      </ColorSchemeProvider>,
    );
    expect(getByText('darkMode')).toBeTruthy();
  });
  it('uses theme based on matchMedia when userPreference', () => {
    let listener = jest.fn();
    window.matchMedia = () => ({
      addListener: (cb) => {
        listener = cb;
      },
      removeListener: jest.fn(),
    });
    const { getByText } = render(
      <ColorSchemeProvider colorScheme="userPreference">
        <ThemeAwareComponent />
      </ColorSchemeProvider>,
    );
    expect(getByText('lightMode')).toBeTruthy();
    act(() => listener({ matches: true }));
    expect(getByText('darkMode')).toBeTruthy();
  });
});
