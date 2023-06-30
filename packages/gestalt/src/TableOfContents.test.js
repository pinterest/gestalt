// @flow strict
import { create } from 'react-test-renderer';
import TableOfContents from './TableOfContents.js';

describe('TableOfContents', () => {
  it('renders', () => {
    const tree = create(
      <TableOfContents title="Title" items={[{ label: 'Label', href: '#' }]} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(
      <TableOfContents
        title="Title"
        items={[{ label: 'Label', href: '#' }]}
        accessibilityLabel="Page table of contents"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
