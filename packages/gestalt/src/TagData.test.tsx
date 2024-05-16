import {create} from 'react-test-renderer';
import Flex from './Flex';
import TagData from './TagData';

describe('TagData', () => {
  it('TagData has a tooltip', () => {
    const component = create(
      <TagData
        onTap={() => {}}
        selected
        text="Text Impressions"
        tooltip={{ text: 'This is a tooltip' }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders tagdata in RTL mode as expected', () => {
    const tree = create(
      <html dir="rtl" lang="en">
        <TagData onRemove={() => {}} showCheckbox text="RTL Text Tag" />
      </html>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders base color as expected', () => {
    const tree = create(
      <Flex gap={2}>
        <TagData
          baseColor="secondary"
          onTap={() => {}}
          selected
          showCheckbox
          text="Text Impressions"
          tooltip={{ text: 'This is a tooltip' }}
        />

        <TagData
          baseColor="primary"
          onTap={() => {}}
          selected
          showCheckbox
          text="Text Impressions"
          tooltip={{ text: 'This is a tooltip' }}
        />
      </Flex>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders all colors as expected', () => {
    const colors = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const component = create(
      <Flex gap={2}>
        {colors.map((color: any) => (
          <TagData
            key={color}
            color={color}
            onTap={() => {}}
            selected
            text="Text Impressions"
            tooltip={{ text: 'This is a tooltip' }}
          />
        ))}
      </Flex>,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders disabled selected state', () => {
    const component = create(
      <TagData
        disabled
        onTap={() => {}}
        selected
        showCheckbox
        text="Text Impressions"
        tooltip={{ text: 'This is a tooltip' }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders disabled unselected state', () => {
    const component = create(
      <TagData
        disabled
        onTap={() => {}}
        showCheckbox
        text="Text Impressions"
        tooltip={{ text: 'This is a tooltip' }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders dismissable button', () => {
    const component = create(
      <TagData
        onRemove={() => {}}
        onTap={() => {}}
        selected
        showCheckbox
        text="Text Impressions"
        tooltip={{ text: 'This is a tooltip' }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders dismisible button with color background', () => {
    const component = create(
      <TagData
        color="03"
        onRemove={() => {}}
        onTap={() => {}}
        selected
        showCheckbox
        text="Text Impressions"
        tooltip={{ text: 'This is a tooltip' }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
