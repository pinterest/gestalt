// @flow strict
import { type Node } from 'react';

type Props = {
  children?: Node,
};

function SearchContent({ children }: Props): Node {
  return <div className="docSearch-content">{children}</div>;
}

export default SearchContent;
