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
      <Tag accessibilityRemoveIconLabel="Remove New tag" onRemove={() => {}} text="New" dataTestId='some-test-id' />,
    );
    const testInstance = component.root;
    const tooltipElement = testInstance.find((instance:any) => instance.props['data-test-id'] === 'some-test-id');
    expect(tooltipElement).not.toBeNull();
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
