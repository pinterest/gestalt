import { create } from 'react-test-renderer';
import Flex from './Flex';
import TileData from './TileData';

describe('TileData', () => {
  it('renders', () => {
    const tree = create(
      <TileData onTap={() => {}} selected title="Text Impressions" value="1.23M" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('TileData renders with tooltip', () => {
    const component = create(
      <TileData
        onTap={() => {}}
        selected
        title="Text Impressions"
        tooltip={{ text: 'This is a tooltip' }}
        value="1.23M"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('TileData renders with dataTestId', () => {
    const component = create(
      <TileData
        onTap={() => {}}
        selected
        dataTestId='some-test-id'
        title="Text Impressions"
        value="1.23M"
      />,
    );
    const testInstance = component.root;
    const tooltipElement = testInstance.find((instance:any) => instance.props['data-test-id'] === 'some-test-id');
    expect(tooltipElement).not.toBeNull();
  });

  test('TileData renders all colors as expected', () => {
    const colors = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const component = create(
      <Flex gap={2}>
        {colors.map((color: any) => (
          <TileData
            key={color}
            color={color}
            onTap={() => {}}
            selected
            title="Text Impressions"
            tooltip={{ text: 'This is a tooltip' }}
            value="1.23M"
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
        onTap={() => {}}
        selected
        showCheckbox
        title="Text Impressions"
        tooltip={{ text: 'This is a tooltip' }}
        value="1.23M"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('TileData title truncates when really long', () => {
    const component = create(
      <TileData
        onTap={() => {}}
        selected
        title="This is some super super super long text and you shouldn't be able to read the last part of it. It's going to use ellipsis to cutoff the last part"
        tooltip={{ text: 'This is a tooltip' }}
        value="1.23M"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('TileData shows readonly checkboxes', () => {
    const component = create(
      <Flex gap={2}>
        <TileData
          onTap={() => {}}
          selected
          showCheckbox
          title=""
          tooltip={{ text: 'This is a tooltip' }}
          value="1.43M"
        />
        <TileData
          onTap={() => {}}
          selected
          showCheckbox
          title=""
          tooltip={{ text: 'This is a tooltip' }}
          value="1.13M"
        />
        <TileData
          onTap={() => {}}
          selected
          showCheckbox
          title=""
          tooltip={{ text: 'This is a tooltip' }}
          value="1.13M"
        />
      </Flex>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
