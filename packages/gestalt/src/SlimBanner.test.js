// @flow strict
import { create } from 'react-test-renderer';
import SlimBanner from './SlimBanner.js';

describe('SlimBanner', () => {
  it('renders', () => {
    const tree = create(<SlimBanner name="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<SlimBanner accessibilityLabel="Test Accessibility Label" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
