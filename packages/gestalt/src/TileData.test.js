// @flow strict
import { create } from 'react-test-renderer';
import TileData from './TileData.js';

describe('TileData', () => {
  it('renders', () => {
    const tree = create(<TileData />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<TileData />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
