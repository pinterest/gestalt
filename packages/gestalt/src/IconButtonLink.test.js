// @flow strict
import { create } from 'react-test-renderer';
import IconButtonLink from './IconButtonLink.js';

describe('IconButtonLink', () => {
  test('renders', () => {
    const component = create(
      <IconButtonLink
        accessibilityLabel="test"
        href="#"
        size="lg"
        rel="nofollow"
        target="blank"
        icon="visit"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with icon', () => {
    const component = create(
      <IconButtonLink
        accessibilityLabel="test"
        href="#"
        icon="visit"
        size="lg"
        rel="nofollow"
        target="blank"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with svg', () => {
    const component = create(
      <IconButtonLink
        accessibilityLabel="test"
        href="#"
        dangerouslySetSvgPath={{ __path: 'M13.00,20.00' }}
        size="lg"
        rel="nofollow"
        target="blank"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with tooltip', () => {
    const component = create(
      <IconButtonLink
        href="#"
        accessibilityLabel="Share"
        icon="share"
        tooltip={{
          text: 'Share',
          idealDirection: 'up',
          accessibilityLabel: '',
        }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders disabled', () => {
    const component = create(
      <IconButtonLink
        accessibilityLabel="test"
        href="#"
        disabled
        size="lg"
        rel="nofollow"
        target="blank"
        icon="visit"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
