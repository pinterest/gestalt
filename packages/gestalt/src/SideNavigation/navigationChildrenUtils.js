// @flow strict
import { type Node as ReactNode } from 'react';
import classnames from 'classnames';
import ItemsEllipsis, { type Props as EllipsisProps } from './ItemsEllipsis';
import styles from '../SideNavigation.css';
import flattenChildren, { type ReactChildArray } from '../utils/flattenChildren';

export const ALLOWED_CHILDREN_MAP = {
  main: ['SideNavigation.Section', 'SideNavigation.TopItem', 'SideNavigation.Group'],
  nested: ['SideNavigation.NestedItem', 'SideNavigation.NestedGroup'],
};

export function validateChildren({
  children,
  filterLevel,
}: {
  children: ReactChildArray,
  filterLevel: 'main' | 'nested',
}) {
  children.forEach((child) => {
    const isTopLevel = filterLevel === 'main';

    if (!ALLOWED_CHILDREN_MAP[filterLevel].includes(child.type.displayName)) {
      throw new Error(
        `Gestalt ${child.type.displayName} cannot be used at ${
          isTopLevel ? 'the top' : 'a nested'
        } level`,
      );
    }
  });
}

export function countItemsWithIcon(children: ReactChildArray): number {
  return flattenChildren(children).reduce(
    (count, child) =>
      child.type.displayName === 'SideNavigation.Section'
        ? count + countItemsWithIcon(child.props.children)
        : count + Number(Boolean(child.props.icon)),
    0,
  );
}

export function getGroupChildActiveProp(
  children: ReactChildArray,
): $PropertyType<EllipsisProps, 'active'> {
  if (children.length === 0) return undefined;

  const activeChild = children.find((child) => !!child.props?.active);

  if (activeChild?.props?.active) return activeChild.props.active;

  const grandChildren = children
    .filter(
      (child) =>
        child?.type?.displayName === 'SideNavigation.Group' ||
        child?.type?.displayName === 'SideNavigation.NestedGroup',
    )
    .map((child) => flattenChildren(child?.props?.children))
    .flat();

  return getGroupChildActiveProp(grandChildren);
}

function renderEllipses(items: $ReadOnlyArray<React$Element<empty> | EllipsisProps>) {
  return items.map((item, i) => {
    if (item.props) return item;

    return (
      // eslint-disable-next-line react/no-array-index-key
      <li key={i} className={classnames(styles.liItem)}>
        <ItemsEllipsis {...item} />
      </li>
    );
  });
}

export function groupIconlessChildren(children: ReactChildArray): $ReadOnlyArray<ReactNode> {
  const ellipses: Array<EllipsisProps> = [];

  // $FlowFixMe[missing-local-annot]
  const items = children.reduce((acc, child) => {
    const isTopItem =
      child.type.displayName === 'SideNavigation.TopItem' ||
      child.type.displayName === 'SideNavigation.Group';
    const shouldSkip = !isTopItem || child.props.icon;

    if (shouldSkip) return acc.concat(child);

    const { notificationAccessibilityLabel, active } = child.props;

    if (ellipses.length === 0 || acc.at(-1)?.type?.displayName === 'SideNavigation.Section') {
      const ellipsis = {};

      acc.push(ellipsis);
      ellipses.push(ellipsis);
    }

    const lastEllipsis = ellipses.at(-1);

    if (lastEllipsis) {
      lastEllipsis.notificationAccessibilityLabel ||= notificationAccessibilityLabel;

      if (active) {
        lastEllipsis.active ||= active;
      } else if (child.type.displayName === 'SideNavigation.Group') {
        lastEllipsis.active ||= getGroupChildActiveProp(flattenChildren(child.props.children));
      }
    }

    return acc;
  }, []);

  return renderEllipses(items);
}
