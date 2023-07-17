// @flow strict
import { create } from 'react-test-renderer';
import DensityProvider from './DensityProvider.js';

describe('DensityProvider', () => {
  it('renders', () => {
    const tree = create(<DensityProvider />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<DensityProvider />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
