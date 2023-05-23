// @flow strict
import { create } from 'react-test-renderer';
import Flex from './Flex.js';
import TileData from './TileData.js';

describe('TileData', () => {
  it('renders', () => {
    const tree = create(
      <TileData title="Text Impressions" value="1.23M" selected onTap={() => {}} />,
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
        onTap={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('TileData renders all colors as expected', () => {
    const colors = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const component = create(
      <Flex gap={2}>
        {colors.map((color) => (
          <TileData
            key={color}
            title="Text Impressions"
            value="1.23M"
            selected
            color={color}
            tooltip={{ text: 'This is a tooltip' }}
            onTap={() => {}}
          />
        ))}
      </Flex>,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Tiledata is disabled', () => {
    const component = create(
      <TileData
        disabled
        title="Text Impressions"
        value="1.23M"
        showCheckbox
        selected
        tooltip={{ text: 'This is a tooltip' }}
        onTap={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('TileData title truncates when really long', () => {
    const component = create(
      <TileData
        title="This is some super super super long text and you shouldn't be able to read the last part of it. It's going to use ellipsis to cutoff the last part"
        value="1.23M"
        selected
        tooltip={{ text: 'This is a tooltip' }}
        onTap={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('TileData shows readonly checkboxes', () => {
    const component = create(
      <Flex gap={2}>
        <TileData
          title=""
          value="1.43M"
          selected
          showCheckbox
          tooltip={{ text: 'This is a tooltip' }}
          onTap={() => {}}
        />
        <TileData
          title=""
          value="1.13M"
          selected
          showCheckbox
          tooltip={{ text: 'This is a tooltip' }}
          onTap={() => {}}
        />
        <TileData
          title=""
          value="1.13M"
          selected
          showCheckbox
          tooltip={{ text: 'This is a tooltip' }}
          onTap={() => {}}
        />
      </Flex>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
