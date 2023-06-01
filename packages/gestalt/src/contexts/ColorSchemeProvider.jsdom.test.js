// @flow strict
import { act, render, screen } from '@testing-library/react';
import ColorSchemeProvider, { useColorScheme } from './ColorSchemeProvider.js';

function ThemeAwareComponent() {
  const theme = useColorScheme();
  return <div>{theme.name}</div>;
}

describe('ColorSchemeProvider', () => {
  it('renders child content in a div', () => {
    const { container } = render(<ColorSchemeProvider>Child 1</ColorSchemeProvider>);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('div')).toMatchInlineSnapshot(`
        <div
          class=""
        >
          Child 1
        </div>
      `);
  });

  it('renders styling for light mode when no color scheme specified', () => {
    const { container } = render(<ColorSchemeProvider>Content</ColorSchemeProvider>);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('style')).toMatchSnapshot();
  });

  it('renders styling for light mode when specified', () => {
    const { container } = render(
      <ColorSchemeProvider colorScheme="light">Content</ColorSchemeProvider>,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('style')).toMatchSnapshot();
  });

  it('renders styling for dark mode when specified', () => {
    const { container } = render(
      <ColorSchemeProvider colorScheme="dark">Content</ColorSchemeProvider>,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('style')).toMatchSnapshot();
  });

  it('renders styling with media query when userPreference', () => {
    const { container } = render(
      <ColorSchemeProvider colorScheme="userPreference">Content</ColorSchemeProvider>,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('style')).toMatchSnapshot();
  });

  it('renders styling with a custom class if has an id', () => {
    const { container } = render(<ColorSchemeProvider id="testId">Content</ColorSchemeProvider>);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.__gestaltThemetestId')).toBeTruthy();
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('style')).toMatchSnapshot();
  });
});

describe('useColorScheme', () => {
  it('uses light mode theme when not in theme provider', () => {
    render(<ThemeAwareComponent />);
    expect(screen.getByText('lightMode')).toBeTruthy();
  });

  it('uses light mode theme when specified', () => {
    render(
      <ColorSchemeProvider colorScheme="light">
        <ThemeAwareComponent />
      </ColorSchemeProvider>,
    );
    expect(screen.getByText('lightMode')).toBeTruthy();
  });

  it('uses dark mode theme when specified', () => {
    render(
      <ColorSchemeProvider colorScheme="dark">
        <ThemeAwareComponent />
      </ColorSchemeProvider>,
    );
    expect(screen.getByText('darkMode')).toBeTruthy();
  });

  it('uses theme based on matchMedia when userPreference', () => {
    // $FlowFixMe[unclear-type]
    let listener = jest.fn<[{| matches: boolean |}], any>();
    window.matchMedia = () => ({
      addListener: (cb) => {
        listener = cb;
      },
      removeListener: jest.fn(),
    });
    render(
      <ColorSchemeProvider colorScheme="userPreference">
        <ThemeAwareComponent />
      </ColorSchemeProvider>,
    );
    expect(screen.getByText('lightMode')).toBeTruthy();
    act(() => listener({ matches: true }));
    expect(screen.getByText('darkMode')).toBeTruthy();
  });
});
