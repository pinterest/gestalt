// @flow strict-local
import { create } from 'react-test-renderer';
import Chart from './Chart.js';

describe('Chart', () => {
  it('renders', () => {
    const tree = create(<Chart />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<Chart />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
