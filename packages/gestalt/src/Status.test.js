// @flow strict
import { create } from 'react-test-renderer';
import Status from './Status.js';

describe('Status', () => {
  it('renders', () => {
    const tree = create(<Status title="Unstarted" type="unstarted" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with a subtext', () => {
    const tree = create(
      <Status subtext="some subtext" title="Unstarted" type="unstarted" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
