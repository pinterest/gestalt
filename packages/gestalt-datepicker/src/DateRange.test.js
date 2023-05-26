// @flow strict-local
import { create } from 'react-test-renderer';
import DateRange from './DateRange.js';

describe('DateRange', () => {
  it('renders', () => {
    const tree = create(<DateRange />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<DateRange />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
