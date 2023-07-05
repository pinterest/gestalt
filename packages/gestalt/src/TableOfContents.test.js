// @flow strict
import { create } from 'react-test-renderer';
import TableOfContents from './TableOfContents.js';

describe('TableOfContents', () => {
  it('renders', () => {
    const tree = create(
      <TableOfContents
        title="Title"
        items={[{ label: 'Item', href: '#', active: true, onClick: () => {} }]}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(
      <TableOfContents
        title="Title"
        items={[{ label: 'Item', href: '#' }]}
        accessibilityLabel="Page table of contents"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders without title', () => {
    const tree = create(
      <TableOfContents
        items={[
          { label: 'Item 1', href: '#1', active: true },
          { label: 'Item 2', href: '#2' },
        ]}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders nested items', () => {
    const tree = create(
      <TableOfContents
        items={[
          {
            label: 'Item',
            href: '#1',
            nestedItems: [
              { label: 'Subitem 1', href: '#11', active: true },
              { label: 'Subitem 2', href: '#12' },
            ],
          },
        ]}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
