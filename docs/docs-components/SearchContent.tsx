import { type ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

function SearchContent({ children }: Props) {
  return <div className="docSearch-content">{children}</div>;
}

export default SearchContent;
