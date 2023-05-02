// @flow strict
import { create } from 'react-test-renderer';
import TagData from './TagData.js';

describe('TagData', () => {
  it('renders', () => {
    const tree = create(<TagData />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<TagData />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
