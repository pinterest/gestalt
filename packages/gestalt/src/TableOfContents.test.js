// @flow strict
import { create } from 'react-test-renderer';
import TableOfContents from './TableOfContents';

describe('TableOfContents', () => {
  it('renders', () => {
    const tree = create(
      <TableOfContents title="Title">
        <TableOfContents.Item active href="#" label="Item" onClick={() => {}} />
      </TableOfContents>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(
      <TableOfContents accessibilityLabel="Page table of contents" title="Title">
        <TableOfContents.Item active href="#" label="Item" />
      </TableOfContents>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders without title', () => {
    const tree = create(
      <TableOfContents>
        <TableOfContents.Item active href="#" label="Item 1" />
        <TableOfContents.Item active={false} href="#" label="Item 2" />
      </TableOfContents>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders nested items', () => {
    const tree = create(
      <TableOfContents>
        <TableOfContents.Item active={false} href="#" label="Item 1">
          <TableOfContents.Item active href="#" label="Subitem 1" />
          <TableOfContents.Item active={false} href="#" label="Subitem 2" />
        </TableOfContents.Item>
      </TableOfContents>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
