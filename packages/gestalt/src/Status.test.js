// @flow strict
import { create } from 'react-test-renderer';
import Status from './Status.js';

describe('Status', () => {
  it('renders', () => {
    const tree = create(<Status type="unstarted" title="Unstarted" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
