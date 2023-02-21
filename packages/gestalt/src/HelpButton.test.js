// @flow strict
import { create } from 'react-test-renderer';
import HelpButton from './HelpButton.js';

test('HelpButton renders correctly', () => {
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

test('HelpButton renders with default link and no accessibility label', () => {
  const component = create(
    <HelpButton
      accessibilityLabel="Click to learn more about Pinterest"
      accessibilityPopoverLabel="Expanded information about Pinterest"
      text="Good test"
      link={{ href: 'https://www.pinterest.com', text: 'Good test' }}
    />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('HelpButton renders with default link and accessibility link label', () => {
  const component = create(
    <HelpButton
      accessibilityLabel="Click to learn more about Pinterest"
      accessibilityPopoverLabel="Expanded information about Pinterest"
      text="Good test"
      link={{ href: 'https://www.pinterest.com', text: 'Pinterest`s home' }}
    />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('HelpButton renders with changing direction to show the popover', () => {
  const component = create(
    <HelpButton
      accessibilityLabel="Click to learn more about Pinterest"
      accessibilityPopoverLabel="Expanded information about Pinterest"
      text="Good test"
      idealDirection="up"
    />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('HelpButton renders with link and no default link label', () => {
  const component = create(
    <HelpButton
      accessibilityLabel="Click to learn more about Pinterest"
      accessibilityPopoverLabel="Expanded information about Pinterest"
      text="Good test"
      link={{
        href: 'https://www.pinterest.com',
        accessibilityLabel: 'Good test',
        text: 'Pinterest home',
      }}
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
    instance.findAll((element) => element.type === 'div')[3].props['aria-controls'],
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
  expect(instance.findAll((element) => element.type === 'div')[3].props['aria-expanded']).toBe(
    false,
  );
});

test('accessibilityLabel="Click to learn more about Pinterest" accessibilityPopoverLabel', () => {
  const instance = create(
    <HelpButton
      accessibilityLabel="Click to learn more about Pinterest"
      accessibilityPopoverLabel="Expanded information about Pinterest"
      text="Good test"
    />,
  ).root;
  expect(instance.findAll((element) => element.type === 'div')[3].props['aria-label']).toContain(
    'Click to learn more',
  );
});
