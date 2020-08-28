// @flow strict
import React, { type Node } from 'react';

type Props = {|
  children?: Node,
|};

const SearchContent = ({ children }: Props): Node => (
  <div className="docSearch-content">{children}</div>
);

export default SearchContent;
