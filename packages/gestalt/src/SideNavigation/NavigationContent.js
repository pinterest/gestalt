// @flow strict
import { Children, Fragment, type Node as ReactNode, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import Collapser from './Collapser';
import getChildrenToArray from './getChildrenToArray';
import ItemsEllipsis, { type Props as EllipsisProps } from './ItemsEllipsis';
import borderStyles from '../Borders.css';
import Box from '../Box';
import { useSideNavigation } from '../contexts/SideNavigationProvider';
import Divider from '../Divider';
import Flex from '../Flex';
import { type Props as SideNavigationProps } from '../SideNavigation';
import styles from '../SideNavigation.css';

type Props = { ...SideNavigationProps };

function hasActiveChildCallback(child: { props: { active: 'page' | 'section' } }) {
  return child?.props?.active && ['page', 'section'].includes(child?.props?.active);
}

// $FlowFixMe[missing-local-annot]
function getChildActiveProp(children) {
  const hasActiveChildren = children.some((child) => !!child.props?.active);

  const hasActiveGrandChildren = children
    .filter((child) => child?.type?.displayName === 'SideNavigation.NestedGroup')
    .map((child) =>
      getChildrenToArray({
        children: child?.props?.children,
        filterLevel: 'nested',
      }).find(hasActiveChildCallback),
    )
    .filter(Boolean);

  return !!hasActiveChildren || (!!hasActiveGrandChildren && !!hasActiveGrandChildren[0]);
}

// $FlowFixMe[missing-local-annot]
function groupIconlessChildren(children) {
  const ellipsisProps: EllipsisProps = {};

  const items = children.reduce((acc, child) => {
    const isTopItem =
      child.type.displayName === 'SideNavigation.TopItem' ||
      child.type.displayName === 'SideNavigation.Group';
    const shouldSkip = !isTopItem || child.props.icon;

    if (shouldSkip) {
      acc.push(child);
      return acc;
    }

    const { notificationAccessibilityLabel, active } = child.props;

    if (!acc.includes(ellipsisProps) || acc.at(-1)?.type?.displayName === 'SideNavigation.Section')
      acc.push(ellipsisProps);

    ellipsisProps.notificationAccessibilityLabel ||= notificationAccessibilityLabel;
    ellipsisProps.active ||= active;

    return acc;
  }, []);

  return items.map((item) =>
    item === ellipsisProps ? (
      <li className={classnames(styles.liItem)}>
        <ItemsEllipsis {...ellipsisProps} />
      </li>
    ) : (
      item
    ),
  );
}

function getChildren(children: ReactNode): $ReadOnlyArray<ReactNode> {
  // $FlowFixMe[underconstrained-implicit-instantiation]
  return Children.toArray(children).reduce((acc, child) => {
    if (child.type !== Fragment) {
      return acc.concat(child);
    }

    return getChildren(child.props.children);
  }, []);
}

export default function NavigationContent({
  accessibilityLabel,
  children,
  footer,
  header,
  showBorder,
  collapsible,
}: Props): ReactNode {
  const navigationChildren = getChildrenToArray({
    children,
    filterLevel: 'main',
  });

  const { collapsed, shouldCollapseEmpty } = useSideNavigation();
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const element = scrollContainer.current;
    const scrollHandler = () => setIsScrolled(!!element?.scrollTop);

    element?.addEventListener('scroll', scrollHandler);

    return () => element?.removeEventListener('scroll', scrollHandler);
  }, []);

  const items = collapsed ? groupIconlessChildren(navigationChildren) : navigationChildren;

  if (collapsible) {
    window.temp1 = navigationChildren;
    window.temp2 = items;
  }

  return (
    <Box height="100%" as="nav" aria-label={accessibilityLabel} color="default">
      <div
        ref={scrollContainer}
        className={showBorder ? classnames(borderStyles.borderRight, styles.fullHeight) : undefined}
      >
        {collapsible && <Collapser raised={isScrolled} />}

        <Box
          display={collapsed && shouldCollapseEmpty ? 'none' : undefined}
          padding={2}
          dangerouslySetInlineStyle={{
            __style: {
              paddingBottom: 24,
              // minWidth: collapsed ? undefined : 280,
              width: collapsed ? undefined : 280,
            },
          }}
        >
          <Flex direction="column" gap={{ column: 4, row: 0 }}>
            {header ? (
              <Flex direction="column" gap={{ column: 4, row: 0 }}>
                <Box width={collapsed ? 44 : undefined}>{header}</Box>
                <Divider />
              </Flex>
            ) : null}

            <ul className={classnames(styles.ulItem)}>{items}</ul>

            {footer ? (
              <Flex direction="column" gap={{ column: 4, row: 0 }}>
                <Divider />
                <Box width={collapsed ? 44 : undefined}>{footer}</Box>
              </Flex>
            ) : null}
          </Flex>
        </Box>
      </div>
    </Box>
  );
}
