// @flow strict
import { type Node } from 'react';
import classNames from 'classnames';
import getChildrenToArray from './getChildrenToArray.js';
import { NestingProvider } from '../contexts/NestingProvider.js';
import Layout from '../Layout.css';
import Whitespace from '../Whitespace.css';

type Props = {|
  children: Node,
|};

export default function TableOfContentsItemList({ children }: Props): Node {
  const childrenArray = getChildrenToArray({ children });

  return (
    <NestingProvider componentName="TableOfContents" maxNestedLevels={5}>
      <ul className={classNames(Layout.flex, Layout.flexColumn, Whitespace.m0, Whitespace.p0)}>
        {childrenArray}
      </ul>
    </NestingProvider>
  );
}
