// @flow strict
import { create } from 'react-test-renderer';
import TileData from './TileData.js';

describe('TileData', () => {
  it('renders', () => {
    const tree = create(<TileData title="Text Impressions" value="1.23M" selected />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('TileData renders with tooltip', () => {
    const component = create(
      <TileData title="Text Impressions" value="1.23M" selected tooltip="this is a tooltip" />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
