import { act, render, screen } from '@testing-library/react';
import ColorSchemeProvider, { useColorScheme } from './ColorSchemeProvider';
import DesignTokensProvider from './DesignTokensProvider';
import ExperimentProvider from './ExperimentProvider';

function ThemeAwareComponent() {
  const theme = useColorScheme();
  return <div>{theme.colorSchemeName}</div>;
}

describe('ColorSchemeProvider', () => {
  it('renders child content in a div with id', () => {
    const { container } = render(
      <ColorSchemeProvider>
        <DesignTokensProvider id="testId">Child 1</DesignTokensProvider>
      </ColorSchemeProvider>,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('div')).toMatchInlineSnapshot(`
      <div
        class="__gestaltThemetestId"
      >
        Child 1
      </div>
    `);
  });

  it('renders styling for light mode when no color scheme specified', () => {
    const { container } = render(
      <ColorSchemeProvider>
        <DesignTokensProvider>Content</DesignTokensProvider>
      </ColorSchemeProvider>,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('style')).toMatchSnapshot();
  });

  it('renders styling for light mode when specified', () => {
    const { container } = render(
      <ColorSchemeProvider colorScheme="light">
        <DesignTokensProvider>Content</DesignTokensProvider>
      </ColorSchemeProvider>,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('style')).toMatchSnapshot();
  });

  it('renders styling for dark mode when specified', () => {
    const { container } = render(
      <ColorSchemeProvider colorScheme="dark">
        <DesignTokensProvider>Content</DesignTokensProvider>
      </ColorSchemeProvider>,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('style')).toMatchSnapshot();
  });

  it('renders styling with media query when userPreference', () => {
    const { container } = render(
      <ColorSchemeProvider colorScheme="userPreference">
        <DesignTokensProvider>Content</DesignTokensProvider>
      </ColorSchemeProvider>,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('style')).toMatchSnapshot();
  });

  it('renders styling with a custom class if has an id', () => {
    const { container } = render(
      <ColorSchemeProvider>
        <DesignTokensProvider id="testId">Content</DesignTokensProvider>
      </ColorSchemeProvider>,
    );
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
        <DesignTokensProvider>
          <ThemeAwareComponent />
        </DesignTokensProvider>
      </ColorSchemeProvider>,
    );
    expect(screen.getByText('lightMode')).toBeTruthy();
  });

  it('uses dark mode theme when specified', () => {
    render(
      <ColorSchemeProvider colorScheme="dark">
        <DesignTokensProvider>
          <ThemeAwareComponent />
        </DesignTokensProvider>
      </ColorSchemeProvider>,
    );
    expect(screen.getByText('darkMode')).toBeTruthy();
  });

  it('uses theme based on matchMedia when userPreference', () => {
    let listener = jest.fn<
      [
        {
          matches: boolean;
        },
      ],
      any
    >();
    // @ts-expect-error - TS2740 - Type '{ addListener: (cb: any) => void; removeListener: Mock<any, any>; }' is missing the following properties from type 'MediaQueryList': matches, media, onchange, addEventListener, and 2 more.
    window.matchMedia = () => ({
      addListener: (cb: any) => {
        listener = cb;
      },
      removeListener: jest.fn(),
    });
    render(
      <ColorSchemeProvider colorScheme="userPreference">
        <DesignTokensProvider>
          <ThemeAwareComponent />
        </DesignTokensProvider>
      </ColorSchemeProvider>,
    );
    expect(screen.getByText('lightMode')).toBeTruthy();
    // @ts-expect-error - TS2769 - No overload matches this call.
    act(() => listener({ matches: true }));
    expect(screen.getByText('darkMode')).toBeTruthy();
  });
});

describe('visual refresh tokens', () => {
  it('uses visual refresh light mode theme when specified', () => {
    const { container } = render(
      <ExperimentProvider
        value={{ 'web_gestalt_visualrefresh': { anyEnabled: true, group: 'enabled' } }}
      >
        <ColorSchemeProvider colorScheme="light">
          <DesignTokensProvider>
            <ThemeAwareComponent />
          </DesignTokensProvider>
        </ColorSchemeProvider>
      </ExperimentProvider>,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('style')).toMatchSnapshot();
  });

  it('uses visual refresh dark mode theme when specified', () => {
    const { container } = render(
      <ExperimentProvider
        value={{ 'web_gestalt_visualrefresh': { anyEnabled: true, group: 'enabled' } }}
      >
        <ColorSchemeProvider colorScheme="dark">
          <DesignTokensProvider>
            <ThemeAwareComponent />
          </DesignTokensProvider>
        </ColorSchemeProvider>
      </ExperimentProvider>,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('style')).toMatchSnapshot();
  });

  it('uses visual refresh with tall line height', () => {
    const { container } = render(
      <ExperimentProvider
        value={{ 'web_gestalt_visualrefresh': { anyEnabled: true, group: 'enabled' } }}
      >
        <ColorSchemeProvider colorScheme="light">
          <DesignTokensProvider languageMode="tall">
            <ThemeAwareComponent />
          </DesignTokensProvider>
        </ColorSchemeProvider>
      </ExperimentProvider>,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('style')).toMatchSnapshot();
  });

  it('uses visual refresh with ck line height', () => {
    const { container } = render(
      <ExperimentProvider
        value={{ 'web_gestalt_visualrefresh': { anyEnabled: true, group: 'enabled' } }}
      >
        <ColorSchemeProvider colorScheme="light">
          {' '}
          <DesignTokensProvider languageMode="ck">
            <ThemeAwareComponent />
          </DesignTokensProvider>
        </ColorSchemeProvider>
      </ExperimentProvider>,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('style')).toMatchSnapshot();
  });

  it('uses visual refresh with ja line height', () => {
    const { container } = render(
      <ExperimentProvider
        value={{ 'web_gestalt_visualrefresh': { anyEnabled: true, group: 'enabled' } }}
      >
        <ColorSchemeProvider colorScheme="light">
          {' '}
          <DesignTokensProvider languageMode="ja">
            <ThemeAwareComponent />
          </DesignTokensProvider>
        </ColorSchemeProvider>
      </ExperimentProvider>,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('style')).toMatchSnapshot();
  });

  it('uses visual refresh with th line height', () => {
    const { container } = render(
      <ExperimentProvider
        value={{ 'web_gestalt_visualrefresh': { anyEnabled: true, group: 'enabled' } }}
      >
        <ColorSchemeProvider colorScheme="light">
          <DesignTokensProvider languageMode="th">
            <ThemeAwareComponent />
          </DesignTokensProvider>
        </ColorSchemeProvider>
      </ExperimentProvider>,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('style')).toMatchSnapshot();
  });

  it('uses visual refresh with vi line height', () => {
    const { container } = render(
      <ExperimentProvider
        value={{ 'web_gestalt_visualrefresh': { anyEnabled: true, group: 'enabled' } }}
      >
        <ColorSchemeProvider colorScheme="light">
          {' '}
          <DesignTokensProvider languageMode="vi">
            <ThemeAwareComponent />
          </DesignTokensProvider>
        </ColorSchemeProvider>
      </ExperimentProvider>,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('style')).toMatchSnapshot();
  });
});
