// @flow strict
import { create } from 'react-test-renderer';
import DateField from './DateField.js';

describe('DateField', () => {
  it('renders', () => {
    const tree = create(<DateField />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<DateField />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
