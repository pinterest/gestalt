// @flow strict-local
import { create } from 'react-test-renderer';
import Chart from './Chart.js';

describe('Chart', () => {
  it('renders', () => {
    // $FlowFixMe[prop-missing]
    const tree = create(<Chart />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    // $FlowFixMe[prop-missing]
    const tree = create(<Chart />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
