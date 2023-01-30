// @flow strict
import { create } from 'react-test-renderer';
import InfoButton from './InfoButton.js';

test('InfoButton renders correctly', () => {
  const component = create(<InfoButton accessibilityPopoverLabel="Pinterest" text="Good test" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('InfoButton renders with default link and no accessibility label', () => {
  const component = create(
    <InfoButton
      accessibilityPopoverLabel="Pinterest"
      text="Good test"
      link={{ href: 'https://www.pinterest.com' }}
    />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('InfoButton renders with default link and accessibility link label', () => {
  const component = create(
    <InfoButton
      accessibilityPopoverLabel="Pinterest"
      text="Good test"
      link={{ href: 'https://www.pinterest.com', accessibilityLabel: 'Pinterest`s home' }}
    />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('InfoButton renders with changing direction to show the popover', () => {
  const component = create(
    <InfoButton accessibilityPopoverLabel="Pinterest" text="Good test" idealDirection="up" />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('InfoButton renders with link and no default link label', () => {
  const component = create(
    <InfoButton
      accessibilityPopoverLabel="Pinterest"
      text="Good test"
      link={{ href: 'https://www.pinterest.com', text: 'Pinterest home' }}
    />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('accessibilityControls', () => {
  const instance = create(
    <InfoButton accessibilityPopoverLabel="Pinterest" text="Good test" />,
  ).root;
  expect(instance.find((element) => element.type === 'div').props['aria-controls']).toContain(
    'info-dialog',
  );
});

test('accessibilityExpanded', () => {
  const instance = create(
    <InfoButton accessibilityPopoverLabel="Pinterest" text="Good test" />,
  ).root;
  expect(instance.find((element) => element.type === 'div').props['aria-expanded']).toBe(false);
});

test('accessibilityPopoverLabel', () => {
  const instance = create(
    <InfoButton accessibilityPopoverLabel="Pinterest" text="Good test" />,
  ).root;
  expect(instance.find((element) => element.type === 'div').props['aria-label']).toContain(
    'Click to learn more',
  );
});
