// @flow strict
import React from 'react';
import { act, render } from '@testing-library/react';
import { ColorSchemeProvider, useColorScheme } from './ColorScheme.js';

function ThemeAwareComponent() {
  const theme = useColorScheme();
  return <div>{theme.name}</div>;
}

describe('ColorSchemeProvider', () => {
  it('renders child content in a div', () => {
    const { container } = render(
      <ColorSchemeProvider>Child 1</ColorSchemeProvider>
    );
    expect(container.querySelector('div')).toMatchInlineSnapshot(`
        <div>
          Child 1
        </div>
      `);
  });
  it('renders styling for light mode when no color scheme specified', () => {
    const { container } = render(
      <ColorSchemeProvider>Content</ColorSchemeProvider>
    );
    expect(container.querySelector('style')).toMatchInlineSnapshot(`
      <style>
        :root {
        --gestalt-colorRed0: #ff5247;
        --gestalt-colorRed100: #e60023;
        --gestalt-colorRed100Active: #a3081a;
        --gestalt-colorRed100Hovered: #ad081b;
        --gestalt-colorGray0: #fff;
        --gestalt-colorGray0Active: #e0e0e0;
        --gestalt-colorGray0Hovered: #f0f0f0;
        --gestalt-colorGray50: #fff;
        --gestalt-colorGray100: #efefef;
        --gestalt-colorGray100Active: #dadada;
        --gestalt-colorGray100Hovered: #e2e2e2;
        --gestalt-colorGray150: #ddd;
        --gestalt-colorGray150Hovered: #d0d0d0;
        --gestalt-colorGray200: #767676;
        --gestalt-colorGray200Active: #828282;
        --gestalt-colorGray200Hovered: #878787;
        --gestalt-colorGray300: #111;
        --gestalt-colorGray400: #000;
        --gestalt-colorTransparentDarkGray: rgba(51, 51, 51, 0.8);
        --gestalt-colorTransparentGray60: rgba(0, 0, 0, 0.06);
        --gestalt-colorTransparentGray100: rgba(0, 0, 0, 0.1);
        --gestalt-colorTransparentWhite: rgba(255, 255, 255, 0.8);
       }
      </style>
    `);
  });
  it('renders styling for light mode when specified', () => {
    const { container } = render(
      <ColorSchemeProvider colorScheme="light">Content</ColorSchemeProvider>
    );
    expect(container.querySelector('style')).toMatchInlineSnapshot(`
      <style>
        :root {
        --gestalt-colorRed0: #ff5247;
        --gestalt-colorRed100: #e60023;
        --gestalt-colorRed100Active: #a3081a;
        --gestalt-colorRed100Hovered: #ad081b;
        --gestalt-colorGray0: #fff;
        --gestalt-colorGray0Active: #e0e0e0;
        --gestalt-colorGray0Hovered: #f0f0f0;
        --gestalt-colorGray50: #fff;
        --gestalt-colorGray100: #efefef;
        --gestalt-colorGray100Active: #dadada;
        --gestalt-colorGray100Hovered: #e2e2e2;
        --gestalt-colorGray150: #ddd;
        --gestalt-colorGray150Hovered: #d0d0d0;
        --gestalt-colorGray200: #767676;
        --gestalt-colorGray200Active: #828282;
        --gestalt-colorGray200Hovered: #878787;
        --gestalt-colorGray300: #111;
        --gestalt-colorGray400: #000;
        --gestalt-colorTransparentDarkGray: rgba(51, 51, 51, 0.8);
        --gestalt-colorTransparentGray60: rgba(0, 0, 0, 0.06);
        --gestalt-colorTransparentGray100: rgba(0, 0, 0, 0.1);
        --gestalt-colorTransparentWhite: rgba(255, 255, 255, 0.8);
       }
      </style>
    `);
  });
  it('renders styling for dark mode when specified', () => {
    const { container } = render(
      <ColorSchemeProvider colorScheme="dark">Content</ColorSchemeProvider>
    );
    expect(container.querySelector('style')).toMatchInlineSnapshot(`
      <style>
        :root {
        --gestalt-colorRed0: #e60023;
        --gestalt-colorRed100: #ff5247;
        --gestalt-colorRed100Active: #b8001b;
        --gestalt-colorRed100Hovered: #cf001f;
        --gestalt-colorGray0: #030303;
        --gestalt-colorGray0Active: #1f1f1f;
        --gestalt-colorGray0Hovered: #121212;
        --gestalt-colorGray50: #212121;
        --gestalt-colorGray100: #404040;
        --gestalt-colorGray100Active: #666;
        --gestalt-colorGray100Hovered: #535353;
        --gestalt-colorGray150: #585858;
        --gestalt-colorGray150Hovered: #535353;
        --gestalt-colorGray200: #ababab;
        --gestalt-colorGray200Active: #9b9b9b;
        --gestalt-colorGray200Hovered: #919191;
        --gestalt-colorGray300: #efefef;
        --gestalt-colorGray400: #fff;
        --gestalt-colorTransparentDarkGray: rgba(255, 255, 255, 0.8);
        --gestalt-colorTransparentGray60: rgba(250, 250, 250, 0.5);
        --gestalt-colorTransparentGray100: rgba(250, 250, 250, 0.6);
        --gestalt-colorTransparentWhite: rgba(51, 51, 51, 0.8);
       }
      </style>
    `);
  });
  it('renders styling with media query when userPreference', () => {
    const { container } = render(
      <ColorSchemeProvider colorScheme="userPreference">
        Content
      </ColorSchemeProvider>
    );
    expect(container.querySelector('style')).toMatchInlineSnapshot(`
      <style>
        @media(prefers-color-scheme: dark) {
        :root {
        --gestalt-colorRed0: #e60023;
        --gestalt-colorRed100: #ff5247;
        --gestalt-colorRed100Active: #b8001b;
        --gestalt-colorRed100Hovered: #cf001f;
        --gestalt-colorGray0: #030303;
        --gestalt-colorGray0Active: #1f1f1f;
        --gestalt-colorGray0Hovered: #121212;
        --gestalt-colorGray50: #212121;
        --gestalt-colorGray100: #404040;
        --gestalt-colorGray100Active: #666;
        --gestalt-colorGray100Hovered: #535353;
        --gestalt-colorGray150: #585858;
        --gestalt-colorGray150Hovered: #535353;
        --gestalt-colorGray200: #ababab;
        --gestalt-colorGray200Active: #9b9b9b;
        --gestalt-colorGray200Hovered: #919191;
        --gestalt-colorGray300: #efefef;
        --gestalt-colorGray400: #fff;
        --gestalt-colorTransparentDarkGray: rgba(255, 255, 255, 0.8);
        --gestalt-colorTransparentGray60: rgba(250, 250, 250, 0.5);
        --gestalt-colorTransparentGray100: rgba(250, 250, 250, 0.6);
        --gestalt-colorTransparentWhite: rgba(51, 51, 51, 0.8);
       }
      }
      </style>
    `);
  });
  it('renders styling with a custom class if has an id', () => {
    const { container } = render(
      <ColorSchemeProvider id="testId">Content</ColorSchemeProvider>
    );
    expect(container.querySelector('.__gestaltThemetestId')).toBeTruthy();
    expect(container.querySelector('style')).toMatchInlineSnapshot(`
      <style>
        .__gestaltThemetestId {
        --gestalt-colorRed0: #ff5247;
        --gestalt-colorRed100: #e60023;
        --gestalt-colorRed100Active: #a3081a;
        --gestalt-colorRed100Hovered: #ad081b;
        --gestalt-colorGray0: #fff;
        --gestalt-colorGray0Active: #e0e0e0;
        --gestalt-colorGray0Hovered: #f0f0f0;
        --gestalt-colorGray50: #fff;
        --gestalt-colorGray100: #efefef;
        --gestalt-colorGray100Active: #dadada;
        --gestalt-colorGray100Hovered: #e2e2e2;
        --gestalt-colorGray150: #ddd;
        --gestalt-colorGray150Hovered: #d0d0d0;
        --gestalt-colorGray200: #767676;
        --gestalt-colorGray200Active: #828282;
        --gestalt-colorGray200Hovered: #878787;
        --gestalt-colorGray300: #111;
        --gestalt-colorGray400: #000;
        --gestalt-colorTransparentDarkGray: rgba(51, 51, 51, 0.8);
        --gestalt-colorTransparentGray60: rgba(0, 0, 0, 0.06);
        --gestalt-colorTransparentGray100: rgba(0, 0, 0, 0.1);
        --gestalt-colorTransparentWhite: rgba(255, 255, 255, 0.8);
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
      </ColorSchemeProvider>
    );
    expect(getByText('lightMode')).toBeTruthy();
  });
  it('uses dark mode theme when specified', () => {
    const { getByText } = render(
      <ColorSchemeProvider colorScheme="dark">
        <ThemeAwareComponent />
      </ColorSchemeProvider>
    );
    expect(getByText('darkMode')).toBeTruthy();
  });
  it('uses theme based on matchMedia when userPreference', () => {
    let listener = jest.fn();
    window.matchMedia = () => ({
      addListener: cb => {
        listener = cb;
      },
      removeListener: jest.fn(),
    });
    const { getByText } = render(
      <ColorSchemeProvider colorScheme="userPreference">
        <ThemeAwareComponent />
      </ColorSchemeProvider>
    );
    expect(getByText('lightMode')).toBeTruthy();
    act(() => listener({ matches: true }));
    expect(getByText('darkMode')).toBeTruthy();
  });
});
