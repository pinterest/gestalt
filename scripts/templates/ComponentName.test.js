// @flow strict
import { create } from 'react-test-renderer';
import ComponentName from './ComponentName.js';

describe('ComponentName', () => {
  it('renders', () => {
    const tree = create(<ComponentName name="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<ComponentName accessibilityLabel="Test Accessibility Label" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
