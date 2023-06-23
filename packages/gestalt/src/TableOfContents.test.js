// @flow strict
import { create } from 'react-test-renderer';
import TableOfContents from './TableOfContents.js';

describe('TableOfContents', () => {
  it('renders', () => {
    const tree = create(<TableOfContents />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<TableOfContents />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
