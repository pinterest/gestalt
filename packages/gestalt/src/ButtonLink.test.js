// @flow strict
import { create } from 'react-test-renderer';
import ButtonLink from './ButtonLink.js';

describe('ButtonLink', () => {
  test('renders', () => {
    const component = create(
      <ButtonLink href="#" size="lg" text="Visit Pinterest" rel="nofollow" target="blank" />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with icon', () => {
    const component = create(
      <ButtonLink
        href="#"
        iconEnd="visit"
        size="lg"
        text="Visit Pinterest"
        rel="nofollow"
        target="blank"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders disabled', () => {
    const component = create(
      <ButtonLink
        href="#"
        disabled
        size="lg"
        text="Visit Pinterest"
        rel="nofollow"
        target="blank"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
