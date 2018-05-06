// @flow
import * as React from 'react';

type Props = {|
  children?: React.Node,
|};

const SearchContent = ({ children }: Props) => (
  <div className="docSearch-content">{children}</div>
);

export default SearchContent;
