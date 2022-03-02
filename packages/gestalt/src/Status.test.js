// @flow strict
import { create } from 'react-test-renderer';
import Status from './Status.js';

describe('Status', () => {
  it('renders with title', () => {
    const tree = create(<Status title="Unstarted" type="unstarted" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with title and subtext', () => {
    const tree = create(
      <Status subtext="some subtext" title="Unstarted" type="unstarted" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with accessibilityLabel', () => {
    const tree = create(
      <Status accessibilityLabel="some accessibilityLabel" type="unstarted" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
