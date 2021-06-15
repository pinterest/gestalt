// @flow strict
import { create } from 'react-test-renderer';
import ComboBox from './ComboBox.js';

describe('ComboBox', () => {
  it('renders', () => {
    const tree = create(<ComboBox name="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<ComboBox accessibilityLabel="Test Accessibility Label" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
