// @flow strict
import { type Node as ReactNode } from 'react';
import classNames from 'classnames';
import getChildrenToArray from './getChildrenToArray';
import { NestingProvider } from '../contexts/NestingProvider';
import Layout from '../Layout.css';
import Whitespace from '../Whitespace.css';

type Props = {
  children: ReactNode,
};

export default function TableOfContentsItemList({ children }: Props): ReactNode {
  const childrenArray = getChildrenToArray({ children });

  return (
    <NestingProvider componentName="TableOfContents" maxNestedLevels={5}>
      <ul className={classNames(Layout.flex, Layout.flexColumn, Whitespace.m0, Whitespace.p0)}>
        {childrenArray}
      </ul>
    </NestingProvider>
  );
}
