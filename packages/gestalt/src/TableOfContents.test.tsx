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

  it('renders with dataTestId', () => {
    const component = create(
      <TableOfContents title="Title" dataTestId="some-test-id">
        <TableOfContents.Item active href="#" label="Item 1" onClick={() => {}} />
        <TableOfContents.Item active href="#" label="Item 2" onClick={() => {}} />
      </TableOfContents>,
    );
    const testInstance = component.root;
    const tooltipElement = testInstance.find(
      (instance: any) => instance.props['data-test-id'] === 'some-test-id',
    );
    expect(tooltipElement).not.toBeNull();
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
