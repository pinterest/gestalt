// @flow strict
import { type Node as ReactNode } from 'react';

type Props = {
  children?: ReactNode,
};

function SearchContent({ children }: Props): ReactNode {
  return <div className="docSearch-content">{children}</div>;
}

export default SearchContent;
