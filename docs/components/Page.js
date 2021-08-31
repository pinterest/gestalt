// @flow strict
import type { Node } from 'react';

import { Children } from 'react';
import CardPage from './CardPage.js';

type Props = {|
  children: Node,
  title: string,
|};

export default function Page({ title, children }: Props): Node {
  const cards = Children.toArray(children);

  return <CardPage cards={cards} page={title} />;
}
