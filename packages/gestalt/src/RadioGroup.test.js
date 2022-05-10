// @flow strict
import { create } from 'react-test-renderer';
import RadioGroup from './RadioGroup.js';

describe('RadioGroup', () => {
  it('renders', () => {
    const tree = create(<RadioGroup name="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<RadioGroup accessibilityLabel="Test Accessibility Label" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
