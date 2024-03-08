// @flow strict
import { Children, Fragment, type Node as ReactNode } from 'react';
import classnames from 'classnames';
import ItemsEllipsis, { type Props as EllipsisProps } from './ItemsEllipsis';
import styles from '../SideNavigation.css';

const ALLOWED_CHILDREN_MAP = {
  main: ['SideNavigation.Section', 'SideNavigation.TopItem', 'SideNavigation.Group'],
  nested: ['SideNavigation.NestedItem', 'SideNavigation.NestedGroup'],
};

/** @deprecated */
const getChildrenToArray = ({
  children,
  filterLevel,
}: {
  children: ReactNode,
  filterLevel: 'main' | 'nested',
}): $ReadOnlyArray<React$Element<empty>> => {
  const navigationChildren = [];

  let recursionLevel = 0;
  const getChildren: ({ nodeChildren: ReactNode }) => void = ({ nodeChildren }) =>
    // $FlowFixMe[underconstrained-implicit-instantiation]
    Children.toArray(nodeChildren).forEach((child) => {
      // Detect incorrect subcomponent usage at the main level
      if (filterLevel === 'main' && ALLOWED_CHILDREN_MAP.nested.includes(child.type.displayName)) {
        throw new Error(`Gestalt ${child.type.displayName} cannot be used at the top level`);
      }

      // Detect incorrect subcomponent usage at the nested level
      if (filterLevel === 'nested' && ALLOWED_CHILDREN_MAP.main.includes(child.type.displayName)) {
        throw new Error(`Gestalt ${child.type.displayName} cannot be used in a nested level`);
      }

      // Get and return valid children
      if (ALLOWED_CHILDREN_MAP[filterLevel].includes(child.type.displayName)) {
        navigationChildren.push(child);
      } else if (child?.type === Fragment) {
        recursionLevel += 1;
        if (recursionLevel < 2) {
          getChildren({ nodeChildren: child.props.children });
        }
      }
    });

  getChildren({ nodeChildren: children });

  return navigationChildren;
};

export function validateChildren({
  children,
  filterLevel,
}: {
  children: ReactNode,
  filterLevel: 'main' | 'nested',
}) {
  // $FlowFixMe[underconstrained-implicit-instantiation]
  Children.toArray(children).forEach((child) => {
    // Detect incorrect subcomponent usage at the main level
    if (filterLevel === 'main' && ALLOWED_CHILDREN_MAP.nested.includes(child.type.displayName)) {
      throw new Error(`Gestalt ${child.type.displayName} cannot be used at the top level`);
    }

    // Detect incorrect subcomponent usage at the nested level
    if (filterLevel === 'nested' && ALLOWED_CHILDREN_MAP.main.includes(child.type.displayName)) {
      throw new Error(`Gestalt ${child.type.displayName} cannot be used in a nested level`);
    }

    if (child?.type === Fragment) {
      validateChildren({ children: child.props.children, filterLevel });
    }
  });
}

export default getChildrenToArray;

export function getNavigationChildren(children: ReactNode): $ReadOnlyArray<React$Element<empty>> {
  // $FlowFixMe[underconstrained-implicit-instantiation]
  return Children.toArray(children).reduce((acc, child) => {
    if (child.type !== Fragment) return acc.concat(child);
    return getNavigationChildren(child.props.children);
  }, []);
}

export function getGroupChildActiveProp(
  children: $ReadOnlyArray<React$Element<empty>>,
): $PropertyType<EllipsisProps, 'active'> {
  const activeChild = children.find((child) => !!child.props?.active);

  if (activeChild?.props?.active) return activeChild.props.active;

  const activeGrandChild = children
    .filter((child) => child?.type?.displayName === 'SideNavigation.NestedGroup')
    .map((child) => getNavigationChildren(child?.props?.children))
    .flat()
    .find((child) => !!child.props?.active);

  return activeGrandChild?.props?.active;
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

export function groupIconlessChildren(
  children: $ReadOnlyArray<React$Element<empty>>,
): $ReadOnlyArray<ReactNode> {
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
        lastEllipsis.active ||= getGroupChildActiveProp(
          getNavigationChildren(child.props.children),
        );
      }
    }

    return acc;
  }, []);

  return renderEllipses(items);
}
