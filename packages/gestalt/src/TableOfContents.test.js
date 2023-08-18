// @flow strict
import { create } from 'react-test-renderer';
import TableOfContents from './TableOfContents.js';

describe('TableOfContents', () => {
  it('renders', () => {
    const tree = create(
      <TableOfContents title="Title">
        <TableOfContents.Item label="Item" href="#" onClick={() => {}} active />
      </TableOfContents>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(
      <TableOfContents title="Title" accessibilityLabel="Page table of contents">
        <TableOfContents.Item label="Item" href="#" active />
      </TableOfContents>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders without title', () => {
    const tree = create(
      <TableOfContents>
        <TableOfContents.Item label="Item 1" href="#" active />
        <TableOfContents.Item label="Item 2" href="#" active={false} />
      </TableOfContents>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders nested items', () => {
    const tree = create(
      <TableOfContents>
        <TableOfContents.Item label="Item 1" href="#" active={false}>
          <TableOfContents.Item label="Subitem 1" href="#" active />
          <TableOfContents.Item label="Subitem 2" href="#" active={false} />
        </TableOfContents.Item>
      </TableOfContents>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
