import { create } from 'react-test-renderer';
import HelpButton from './HelpButton';

describe('HelpButton', () => {
  test('renders correctly', () => {
    const component = create(
      <HelpButton
        accessibilityLabel="Click to learn more about Pinterest"
        accessibilityPopoverLabel="Expanded information about Pinterest"
        text="Good test"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with default link and no accessibility label', () => {
    const component = create(
      <HelpButton
        accessibilityLabel="Click to learn more about Pinterest"
        accessibilityPopoverLabel="Expanded information about Pinterest"
        link={{ href: 'https://www.pinterest.com', text: 'Good test' }}
        text="Good test"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with default link and accessibility link label', () => {
    const component = create(
      <HelpButton
        accessibilityLabel="Click to learn more about Pinterest"
        accessibilityPopoverLabel="Expanded information about Pinterest"
        link={{ href: 'https://www.pinterest.com', text: 'Pinterest`s home' }}
        text="Good test"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with changing direction to show the popover', () => {
    const component = create(
      <HelpButton
        accessibilityLabel="Click to learn more about Pinterest"
        accessibilityPopoverLabel="Expanded information about Pinterest"
        idealDirection="up"
        text="Good test"
      />,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with link and no default link label', () => {
    const component = create(
      <HelpButton
        accessibilityLabel="Click to learn more about Pinterest"
        accessibilityPopoverLabel="Expanded information about Pinterest"
        link={{
          href: 'https://www.pinterest.com',
          accessibilityLabel: 'Good test',
          text: 'Pinterest home',
        }}
        text="Good test"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('accessibilityControls', () => {
    const instance = create(
      <HelpButton
        accessibilityLabel="Click to learn more about Pinterest"
        accessibilityPopoverLabel="Expanded information about Pinterest"
        text="Good test"
      />,
    ).root;

    expect(
      instance.findAll((element: any) => element.type === 'div')[3]?.props['aria-controls'],
    ).toBeTruthy();
  });

  test('accessibilityExpanded', () => {
    const instance = create(
      <HelpButton
        accessibilityLabel="Click to learn more about Pinterest"
        accessibilityPopoverLabel="Expanded information about Pinterest"
        text="Good test"
      />,
    ).root;
    expect(
      instance.findAll((element: any) => element.type === 'div')[3]?.props['aria-expanded'],
    ).toBe(false);
  });

  test('accessibilityLabel="Click to learn more about Pinterest" accessibilityPopoverLabel', () => {
    const instance = create(
      <HelpButton
        accessibilityLabel="Click to learn more about Pinterest"
        accessibilityPopoverLabel="Expanded information about Pinterest"
        text="Good test"
      />,
    ).root;
    expect(
      instance.findAll((element: any) => element.type === 'div')[3]?.props['aria-label'],
    ).toContain('Click to learn more');
  });
});
