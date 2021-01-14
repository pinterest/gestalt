// @flow strict
import { type Node } from 'react';
import icons from './icons/index.js';

export type BaseProps = {|
  id: string,
  title?: string,
  icon?: $Keys<typeof icons>,
  iconAccessibilityLabel?: string,
  type?: 'error' | 'info',
  children?: Node,
|};

export type ExpandableBaseProps = {|
  id: string,
  accessibilityExpandLabel: string,
  accessibilityCollapseLabel: string,
  items: $ReadOnlyArray<{|
    title: string,
    icon?: $Keys<typeof icons>,
    iconAccessibilityLabel?: string,
    summary?: $ReadOnlyArray<string>,
    type?: 'error' | 'info',
    children?: Node,
  |}>,
|};

export type ExpandableItemProps = {|
  accessibilityExpandLabel: string,
  accessibilityCollapseLabel: string,
  summary?: $ReadOnlyArray<string>,
  isCollapsed: boolean,
  onModuleClicked: (boolean) => void,
|};

export type TitleProps = {|
  title?: string,
  icon?: $Keys<typeof icons>,
  iconAccessibilityLabel?: string,
  type?: 'error' | 'info',
|};
