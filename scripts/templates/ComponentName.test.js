// @flow strict
import { create } from 'react-test-renderer';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('renders', () => {
    const tree = create(<ComponentName />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<ComponentName />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
