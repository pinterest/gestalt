// @flow strict
import { create } from 'react-test-renderer';
import ButtonLink from './ButtonLink';

describe('ButtonLink', () => {
  test('renders', () => {
    const component = create(
      <ButtonLink href="#" rel="nofollow" size="lg" target="blank" text="Visit Pinterest" />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with icon', () => {
    const component = create(
      <ButtonLink
        href="#"
        iconEnd="visit"
        rel="nofollow"
        size="lg"
        target="blank"
        text="Visit Pinterest"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders disabled', () => {
    const component = create(
      <ButtonLink
        disabled
        href="#"
        rel="nofollow"
        size="lg"
        target="blank"
        text="Visit Pinterest"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
