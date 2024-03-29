// @flow strict
import { create } from 'react-test-renderer';
import DatapointTrend from './Trend';

describe('DatapointTrend', () => {
  it('renders', () => {
    const tree = create(
      <DatapointTrend
        iconAccessibilityLabel="Value change icon accessibility label"
        sentiment="good"
        value={30}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(
      <DatapointTrend iconAccessibilityLabel="Value change icon accessibility label" value={30} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
