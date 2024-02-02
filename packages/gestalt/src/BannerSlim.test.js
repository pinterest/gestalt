// @flow strict
import { create } from 'react-test-renderer';
import Link from './Link';
import BannerSlim from './BannerSlim';
import Text from './Text';

describe('BannerSlim', () => {
  it('renders neutral type with message', () => {
    const tree = create(<BannerSlim message="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an icon with accessibility label', () => {
    const tree = create(
      <BannerSlim
        message="test"
        type="error"
        iconAccessibilityLabel="accessibility label with error"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders non-neutral compact with accessibility label', () => {
    const tree = create(
      <BannerSlim
        message="test"
        type="errorBare"
        iconAccessibilityLabel="accessibility label with error"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders simple message with helper link', () => {
    const tree = create(
      <BannerSlim
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

  it('renders complex message', () => {
    const tree = create(
      <BannerSlim
        message={
          <Text inline>
            The campaign{' '}
            <Text inline weight="bold">
              Back to School
            </Text>{' '}
            is regularly hitting its{' '}
            <Link display="inlineBlock" href="http://www.pinterest.com">
              daily cap
            </Link>
            . Consider raising daily caps to increase scale for a similar CPC and CTR.
          </Text>
        }
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders primary action and dismiss button', () => {
    const tree = create(
      <BannerSlim
        message="test"
        primaryAction={{
          accessibilityLabel: 'test',
          label: 'test',
          onClick: () => {},
          role: 'button',
        }}
        dismissButton={{
          accessibilityLabel: 'test',
          onDismiss: () => {},
        }}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
