// @flow strict
import { create } from 'react-test-renderer';
import SlimBanner from './SlimBanner.js';

describe('SlimBanner', () => {
  it('renders neutral type with message', () => {
    const tree = create(<SlimBanner message="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an icon with accessibility label', () => {
    const tree = create(
      <SlimBanner
        message="test"
        type="error"
        iconAccessibilityLabel="accessibility label with error"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders non-neutral lite with accessibility label', () => {
    const tree = create(
      <SlimBanner
        message="test"
        type="errorLite"
        iconAccessibilityLabel="accessibility label with error"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders helper link', () => {
    const tree = create(
      <SlimBanner
        message="test"
        helperLink={{
          text: 'Learn more',
          accessibilityLabel: 'Learn more Pinterest.com',
          href: 'http://www.pinterest.com',
          onClick: () => {},
        }}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
