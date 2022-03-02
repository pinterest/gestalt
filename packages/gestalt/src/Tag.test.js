// @flow strict
import { create } from 'react-test-renderer';
import Tag from './Tag.js';

describe('Tag', () => {
  it('renders', () => {
    const tree = create(
      <Tag text="New" onRemove={() => {}} removeIconAccessibilityLabel="Remove New tag" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a disabled tag', () => {
    const tree = create(<Tag text="New" disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a tag with an error state', () => {
    const tree = create(
      <Tag
        text="New"
        onRemove={() => {}}
        removeIconAccessibilityLabel="Remove New tag"
        errorMessage="Something went wrong"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('clips long strings', () => {
    const tree = create(
      <Tag
        text="The quick brown fox jumps over the lazy dog"
        onRemove={() => {}}
        removeIconAccessibilityLabel="Remove long example tag"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
