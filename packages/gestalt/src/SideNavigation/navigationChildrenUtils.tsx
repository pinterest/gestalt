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

// @ts-expect-error - TS2345 - Argument of type 'any' is not assignable to parameter of type 'never'. | TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
    if (!ALLOWED_CHILDREN_MAP[filterLevel].includes(child.type.displayName)) {
      throw new Error(
// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
        `Gestalt ${child.type.displayName} cannot be used at ${
          isTopLevel ? 'the top' : 'a nested'
        } level`,
      );
    }
  });
}

export function countItemsWithIcon(children: ReactChildArray): number {
// @ts-expect-error - TS2322 - Type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal' is not assignable to type 'number'.
  return flattenChildren(children).reduce(
    (count, child) =>
// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
      child.type.displayName === 'SideNavigation.Section'
// @ts-expect-error - TS2365 - Operator '+' cannot be applied to types 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal' and 'number'. | TS2339 - Property 'props' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
        ? count + countItemsWithIcon(child.props.children)
// @ts-expect-error - TS2365 - Operator '+' cannot be applied to types 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal' and 'number'. | TS2339 - Property 'props' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
        : count + Number(Boolean(child.props.icon)),
    0,
  );
}

export function getChildrenActiveProp(children: ReactChildArray): EllipsisProps['active'] {
  if (children.length === 0) return undefined;

// @ts-expect-error - TS2339 - Property 'props' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
  const activeChild = children.find((child) => !!child.props?.active);

// @ts-expect-error - TS2339 - Property 'props' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'. | TS2339 - Property 'props' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
  if (activeChild?.props?.active) return activeChild.props.active;

  const grandChildren = children
    .filter(
      (child) =>
// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
        child?.type?.displayName === 'SideNavigation.Group' ||
// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
        child?.type?.displayName === 'SideNavigation.NestedGroup',
    )
// @ts-expect-error - TS2339 - Property 'props' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
    .map((child) => flattenChildren(child?.props?.children))
    .flat();

  return getChildrenActiveProp(grandChildren);
}

function renderEllipses(
  items: ReadonlyArray<React.ReactElement<React.ComponentProps<never>> | EllipsisProps>,
) {
  return items.map((item, i) => {
// @ts-expect-error - TS2339 - Property 'props' does not exist on type 'Props | ReactElement<never, string | JSXElementConstructor<any>>'.
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
// @ts-expect-error - TS7034 - Variable 'lastEllipsisIndex' implicitly has type 'any' in some locations where its type cannot be determined.
  let lastEllipsisIndex;
// @ts-expect-error - TS7034 - Variable 'lastSectionIndex' implicitly has type 'any' in some locations where its type cannot be determined.
  let lastSectionIndex;

  const items = children.reduce<Array<any>>((acc, child, index) => {
// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
    const isSection = child.type.displayName === 'SideNavigation.Section';
// @ts-expect-error - TS2339 - Property 'props' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
    const shouldSkip = isSection || !!child.props.icon;

    // Keep track of last section index
    if (isSection) lastSectionIndex = index;
    // Sections or items with icons are skipped and just added to the items list.
    if (shouldSkip) return acc.concat(child);

// @ts-expect-error - TS2339 - Property 'props' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
    const { notificationAccessibilityLabel, active } = child.props;

    // Create new ellipsis if there are no ellipses
    // or after the last ellipsis there is a section.
// @ts-expect-error - TS7005 - Variable 'lastEllipsisIndex' implicitly has an 'any' type. | TS7005 - Variable 'lastEllipsisIndex' implicitly has an 'any' type. | TS7005 - Variable 'lastSectionIndex' implicitly has an 'any' type.
    if (lastEllipsisIndex === undefined || lastEllipsisIndex < lastSectionIndex) {
      const ellipsis: EllipsisProps = {};
      lastEllipsisIndex = index;
      acc.push(ellipsis);
    }

    // Take the last ellipsis from the resulting list of items.
// @ts-expect-error - TS2339 - Property 'at' does not exist on type 'any[]'. | TS7005 - Variable 'lastEllipsisIndex' implicitly has an 'any' type.
    const lastEllipsis = acc.at(lastEllipsisIndex);

    if (lastEllipsis) {
      // Set notification label of the current child to the last ellipsis
      // unless the ellipsis already has a notification label.
      lastEllipsis.notificationAccessibilityLabel ||= notificationAccessibilityLabel;

      // Set ellipsis active prop if the current child or
      // one of its nested children is active.
      if (active) {
        lastEllipsis.active ||= active;
// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
      } else if (child.type.displayName === 'SideNavigation.Group') {
// @ts-expect-error - TS2339 - Property 'props' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
        lastEllipsis.active ||= getChildrenActiveProp(flattenChildren(child.props.children));
      }
    }

    return acc;
  }, []);

// @ts-expect-error - TS2322 - Type '(Element | Props)[]' is not assignable to type 'readonly ReactNode[]'.
  return renderEllipses(items);
}
