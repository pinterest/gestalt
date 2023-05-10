// @flow strict
import { create } from 'react-test-renderer';
import TileData from './TileData.js';

describe('TileData', () => {
  it('renders', () => {
    const tree = create(
      <TileData title="Text Impressions" value="1.23M" selected onChange={() => {}} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('TileData renders with tooltip', () => {
    const component = create(
      <TileData
        title="Text Impressions"
        value="1.23M"
        selected
        tooltip={{ text: 'This is a tooltip' }}
        onChange={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
