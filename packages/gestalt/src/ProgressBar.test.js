// @flow strict
import { create } from 'react-test-renderer';
import ProgressBar from './ProgressBar.js';

describe('ProgressBar', () => {
  it('renders', () => {
    const tree = create(<ProgressBar name="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<ProgressBar accessibilityLabel="Test Accessibility Label" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
