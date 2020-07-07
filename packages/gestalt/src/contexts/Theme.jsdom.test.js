// @flow strict
import React from 'react';
import { act, render } from '@testing-library/react';
import { ThemeProvider, useTheme } from './Theme.js';

function ThemeAwareComponent() {
  const theme = useTheme();
  return <div>{theme.name}</div>;
}

describe('Themeing', () => {
  describe('ThemeProvider', () => {
    it('renders child content in a div', () => {
      const { container } = render(<ThemeProvider>Child 1</ThemeProvider>);
      expect(container.querySelector('div')).toMatchInlineSnapshot(`
        <div>
          Child 1
        </div>
      `);
    });
    it('renders styling for light mode when no color scheme specified', () => {
      const { container } = render(<ThemeProvider>Content</ThemeProvider>);
      expect(container.querySelector('style')).toMatchInlineSnapshot(`
        <style>
          :root {
          --colorRed0: #ff5247;
          --colorRed100: #e60023;
          --colorGray0: #fff;
          --colorGray50: #fff;
          --colorGray100: #efefef;
          --colorGray200: #767676;
          --colorGray300: #111;
          --colorGray400: #000;
         }
        </style>
      `);
    });
    it('renders styling for light mode when specified', () => {
      const { container } = render(
        <ThemeProvider colorScheme="light">Content</ThemeProvider>
      );
      expect(container.querySelector('style')).toMatchInlineSnapshot(`
        <style>
          :root {
          --colorRed0: #ff5247;
          --colorRed100: #e60023;
          --colorGray0: #fff;
          --colorGray50: #fff;
          --colorGray100: #efefef;
          --colorGray200: #767676;
          --colorGray300: #111;
          --colorGray400: #000;
         }
        </style>
      `);
    });
    it('renders styling for dark mode when specified', () => {
      const { container } = render(
        <ThemeProvider colorScheme="dark">Content</ThemeProvider>
      );
      expect(container.querySelector('style')).toMatchInlineSnapshot(`
        <style>
          :root {
          --colorRed0: #e60023;
          --colorRed100: #ff5247;
          --colorGray0: #050505;
          --colorGray50: #272727;
          --colorGray100: #494949;
          --colorGray200: #b8b8b8;
          --colorGray300: #efefef;
          --colorGray400: #fff;
         }
        </style>
      `);
    });
    it('renders styling with media query when userPreference', () => {
      const { container } = render(
        <ThemeProvider colorScheme="userPreference">Content</ThemeProvider>
      );
      expect(container.querySelector('style')).toMatchInlineSnapshot(`
        <style>
          @media(prefers-color-scheme: dark) {
          :root {
          --colorRed0: #e60023;
          --colorRed100: #ff5247;
          --colorGray0: #050505;
          --colorGray50: #272727;
          --colorGray100: #494949;
          --colorGray200: #b8b8b8;
          --colorGray300: #efefef;
          --colorGray400: #fff;
         }
        }
        </style>
      `);
    });
    it('renders styling with a custom class if has an id', () => {
      const { container } = render(
        <ThemeProvider id="testId">Content</ThemeProvider>
      );
      expect(container.querySelector('.__gestaltThemetestId')).toBeTruthy();
      expect(container.querySelector('style')).toMatchInlineSnapshot(`
        <style>
          .__gestaltThemetestId {
          --colorRed0: #ff5247;
          --colorRed100: #e60023;
          --colorGray0: #fff;
          --colorGray50: #fff;
          --colorGray100: #efefef;
          --colorGray200: #767676;
          --colorGray300: #111;
          --colorGray400: #000;
         }
        </style>
      `);
    });
  });
  describe('useTheme', () => {
    it('uses light mode theme when not in theme provider', () => {
      const { getByText } = render(<ThemeAwareComponent />);
      expect(getByText('lightMode')).toBeTruthy();
    });
    it('uses light mode theme when specified', () => {
      const { getByText } = render(
        <ThemeProvider colorScheme="light">
          <ThemeAwareComponent />
        </ThemeProvider>
      );
      expect(getByText('lightMode')).toBeTruthy();
    });
    it('uses dark mode theme when specified', () => {
      const { getByText } = render(
        <ThemeProvider colorScheme="dark">
          <ThemeAwareComponent />
        </ThemeProvider>
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
        <ThemeProvider colorScheme="userPreference">
          <ThemeAwareComponent />
        </ThemeProvider>
      );
      expect(getByText('lightMode')).toBeTruthy();
      act(() => listener({ matches: true }));
      expect(getByText('darkMode')).toBeTruthy();
    });
  });
});
