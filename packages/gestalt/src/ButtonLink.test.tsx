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

  test('renders with icon on the right', () => {
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

  it('renders with icon on the left', () => {
    const instance = create(
      <ButtonLink
        accessibilityLabel="hello"
        href="#"
        iconStart="sparkle"
        rel="nofollow"
        size="lg"
        target="blank"
        text="Visit Pinterest"
      />,
    ).root;
    expect(instance.find((element: any) => element.type === 'svg')).not.toBeNull();
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
