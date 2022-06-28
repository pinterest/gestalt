// @flow strict
import { create } from 'react-test-renderer';
import SideNavigation from './SideNavigation.js';

describe('SideNavigation', () => {
  it('renders', () => {
    const tree = create(<SideNavigation name="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<SideNavigation accessibilityLabel="Test Accessibility Label" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
