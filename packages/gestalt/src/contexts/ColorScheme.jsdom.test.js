// @flow strict
import { act, render } from '@testing-library/react';
import { ColorSchemeProvider, useColorScheme } from './ColorScheme.js';

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
