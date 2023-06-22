// @flow strict
import { create } from 'react-test-renderer';
import Flex from './Flex.js';
import TagData from './TagData.js';

describe('TagData', () => {
  it('TagData has a tooltip', () => {
    const component = create(
      <TagData
        text="Text Impressions"
        selected
        tooltip={{ text: 'This is a tooltip' }}
        onTap={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders tagdata in RTL mode as expected', () => {
    const tree = create(
      <html dir="rtl" lang="en">
        <TagData showCheckbox onRemove={() => {}} text="RTL Text Tag" />
      </html>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders base color as expected', () => {
    const tree = create(
      <Flex gap={2}>
        <TagData
          baseColor="secondary"
          showCheckbox
          selected
          text="Text Impressions"
          tooltip={{ text: 'This is a tooltip' }}
          onTap={() => {}}
        />

        <TagData
          baseColor="primary"
          selected
          showCheckbox
          text="Text Impressions"
          tooltip={{ text: 'This is a tooltip' }}
          onTap={() => {}}
        />
      </Flex>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders all colors as expected', () => {
    const colors = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const component = create(
      <Flex gap={2}>
        {colors.map((color) => (
          <TagData
            key={color}
            text="Text Impressions"
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

  it('renders disabled selected state', () => {
    const component = create(
      <TagData
        disabled
        text="Text Impressions"
        showCheckbox
        selected
        tooltip={{ text: 'This is a tooltip' }}
        onTap={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders disabled unselected state', () => {
    const component = create(
      <TagData
        disabled
        text="Text Impressions"
        showCheckbox
        tooltip={{ text: 'This is a tooltip' }}
        onTap={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders dismissable button', () => {
    const component = create(
      <TagData
        text="Text Impressions"
        showCheckbox
        selected
        tooltip={{ text: 'This is a tooltip' }}
        onTap={() => {}}
        onRemove={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders dismisible button with color background', () => {
    const component = create(
      <TagData
        text="Text Impressions"
        color="03"
        showCheckbox
        selected
        tooltip={{ text: 'This is a tooltip' }}
        onTap={() => {}}
        onRemove={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
