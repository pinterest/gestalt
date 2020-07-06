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
    it('renders child content in a div with a unique className', () => {
      const { container } = render(
        <>
          <ThemeProvider>Child 1</ThemeProvider>
          <ThemeProvider>Child 2</ThemeProvider>
        </>
      );
      expect(container.querySelectorAll('div')).toMatchInlineSnapshot(`
        NodeList [
          <div
            class="__gestaltTheme1"
          >
            Child 1
          </div>,
          <div
            class="__gestaltTheme2"
          >
            Child 2
          </div>,
        ]
      `);
    });
    it('renders styling for light mode when no color scheme specified', () => {
      const { container } = render(<ThemeProvider>Content</ThemeProvider>);
      expect(container.querySelectorAll('style')).toMatchInlineSnapshot(`
        NodeList [
          <style>
            .__gestaltTheme3 {
          --colorRed0: #ff5247;
          --colorRed100: #e60023;
          --colorGray0: #fff;
          --colorGray50: #fff;
          --colorGray100: #efefef;
          --colorGray200: #767676;
          --colorGray300: #111;
          --colorGray400: #000;
         }
          </style>,
        ]
      `);
    });
    it('renders styling for light mode when specified', () => {
      const { container } = render(
        <ThemeProvider colorScheme="light">Content</ThemeProvider>
      );
      expect(container.querySelectorAll('style')).toMatchInlineSnapshot(`
        NodeList [
          <style>
            .__gestaltTheme4 {
          --colorRed0: #ff5247;
          --colorRed100: #e60023;
          --colorGray0: #fff;
          --colorGray50: #fff;
          --colorGray100: #efefef;
          --colorGray200: #767676;
          --colorGray300: #111;
          --colorGray400: #000;
         }
          </style>,
        ]
      `);
    });
    it('renders styling for dark mode when specified', () => {
      const { container } = render(
        <ThemeProvider colorScheme="dark">Content</ThemeProvider>
      );
      expect(container.querySelectorAll('style')).toMatchInlineSnapshot(`
        NodeList [
          <style>
            .__gestaltTheme5 {
          --colorRed0: #e60023;
          --colorRed100: #ff5247;
          --colorGray0: #050505;
          --colorGray50: #272727;
          --colorGray100: #494949;
          --colorGray200: #b8b8b8;
          --colorGray300: #efefef;
          --colorGray400: #fff;
         }
          </style>,
        ]
      `);
    });
    it('renders styling with media query when userPreferance', () => {
      const { container } = render(
        <ThemeProvider colorScheme="userPreferance">Content</ThemeProvider>
      );
      expect(container.querySelectorAll('style')).toMatchInlineSnapshot(`
        NodeList [
          <style>
            @media(prefers-color-scheme: dark) {
          .__gestaltTheme6 {
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
          </style>,
        ]
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
    it('uses theme based on matchMedia when userPreferance', () => {
      let listener = jest.fn();
      window.matchMedia = () => ({
        addListener: cb => {
          listener = cb;
        },
        removeListener: jest.fn(),
      });
      const { getByText } = render(
        <ThemeProvider colorScheme="userPreferance">
          <ThemeAwareComponent />
        </ThemeProvider>
      );
      expect(getByText('lightMode')).toBeTruthy();
      act(() => listener({ matches: true }));
      expect(getByText('darkMode')).toBeTruthy();
    });
  });
});
