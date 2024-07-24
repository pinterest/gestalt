import { create } from 'react-test-renderer';
import Tag from './Tag';

describe('Tag', () => {
  it('renders', () => {
    const tree = create(
      <Tag accessibilityRemoveIconLabel="Remove New tag" onRemove={() => {}} text="New" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Tag renders with dataTestId', () => {
    const component = create(
      <Tag
        accessibilityRemoveIconLabel="Remove New tag"
        dataTestId="some-test-id"
        onRemove={() => {}}
        text="New"
      />,
    ).root;
    expect(
      component
        .findAll((element) => element.type === 'div')
        .filter((node) => node.props['data-test-id'] === 'some-test-id'),
    ).toHaveLength(1);
  });

  it('renders a disabled tag', () => {
    const tree = create(<Tag disabled onRemove={() => {}} text="New" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a tag with an error state', () => {
    const tree = create(<Tag onRemove={() => {}} text="New" type="error" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a tag with a warning state', () => {
    const tree = create(<Tag onRemove={() => {}} text="New" type="warning" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('clips long strings', () => {
    const tree = create(
      <Tag
        accessibilityRemoveIconLabel="Remove long example tag"
        onRemove={() => {}}
        text="The quick brown fox jumps over the lazy dog"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
