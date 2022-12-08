// @flow strict
import { create } from 'react-test-renderer';
import List from './List.js';

describe('List', () => {
  it('renders', () => {
    const tree = create(<List name="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<List accessibilityLabel="Test Accessibility Label" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
