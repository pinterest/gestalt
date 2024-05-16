import { ReactNode } from 'react';
import classnames from 'classnames';
import ItemsEllipsis, { Props as EllipsisProps } from './ItemsEllipsis';
import styles from '../SideNavigation.css';
import flattenChildren, { ReactChildArray } from '../utils/flattenChildren';

export const ALLOWED_CHILDREN_MAP = {
  main: ['SideNavigation.Section', 'SideNavigation.TopItem', 'SideNavigation.Group'],
  nested: ['SideNavigation.NestedItem', 'SideNavigation.NestedGroup'],
} as const;

export function validateChildren({
  children,
  filterLevel,
}: {
  children: ReactChildArray;
  filterLevel: 'main' | 'nested';
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

export function getChildrenActiveProp(children: ReactChildArray): EllipsisProps['active'] {
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

  return getChildrenActiveProp(grandChildren);
}

function renderEllipses(
  items: ReadonlyArray<React.ReactElement<React.ComponentProps<never>> | EllipsisProps>,
) {
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

/**
 * Reduces `TopItem` and `Group` items into ellipsis if they have no icons.
 * This is for items that are not inside `Section`.
 * If there are `TopItem` or `Group` items before and after `Section`s,
 * each portion will have separate ellipses for iconless items.
 * Ellipses are added as props object, not a component, during the process,
 * so it is easier to update.
 */
export function reduceIconlessChildrenIntoEllipsis(
  children: ReactChildArray,
): ReadonlyArray<ReactNode> {
  let lastEllipsisIndex;
  let lastSectionIndex;

  const items = children.reduce<Array<any>>((acc, child, index) => {
    const isSection = child.type.displayName === 'SideNavigation.Section';
    const shouldSkip = isSection || !!child.props.icon;

    // Keep track of last section index
    if (isSection) lastSectionIndex = index;
    // Sections or items with icons are skipped and just added to the items list.
    if (shouldSkip) return acc.concat(child);

    const { notificationAccessibilityLabel, active } = child.props;

    // Create new ellipsis if there are no ellipses
    // or after the last ellipsis there is a section.
    if (lastEllipsisIndex === undefined || lastEllipsisIndex < lastSectionIndex) {
      const ellipsis: EllipsisProps = {};
      lastEllipsisIndex = index;
      acc.push(ellipsis);
    }

    // Take the last ellipsis from the resulting list of items.
    const lastEllipsis = acc.at(lastEllipsisIndex);

    if (lastEllipsis) {
      // Set notification label of the current child to the last ellipsis
      // unless the ellipsis already has a notification label.
      lastEllipsis.notificationAccessibilityLabel ||= notificationAccessibilityLabel;

      // Set ellipsis active prop if the current child or
      // one of its nested children is active.
      if (active) {
        lastEllipsis.active ||= active;
      } else if (child.type.displayName === 'SideNavigation.Group') {
        lastEllipsis.active ||= getChildrenActiveProp(flattenChildren(child.props.children));
      }
    }

    return acc;
  }, []);

  return renderEllipses(items);
}
