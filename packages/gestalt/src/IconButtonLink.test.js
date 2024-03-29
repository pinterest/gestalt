// @flow strict
import { create } from 'react-test-renderer';
import IconButtonLink from './IconButtonLink';

describe('IconButtonLink', () => {
  test('renders', () => {
    const component = create(
      <IconButtonLink
        accessibilityLabel="test"
        href="#"
        icon="visit"
        rel="nofollow"
        size="lg"
        target="blank"
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
        rel="nofollow"
        size="lg"
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
        dangerouslySetSvgPath={{ __path: 'M13.00,20.00' }}
        href="#"
        rel="nofollow"
        size="lg"
        target="blank"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with tooltip', () => {
    const component = create(
      <IconButtonLink
        accessibilityLabel="Share"
        href="#"
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
        disabled
        href="#"
        icon="visit"
        rel="nofollow"
        size="lg"
        target="blank"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
