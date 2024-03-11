// @flow strict
import { type Node as ReactNode, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import Collapser from './Collapser';
import {
  countItemsWithIcon,
  groupIconlessChildren,
  validateChildren,
} from './navigationChildrenUtils';
import borderStyles from '../Borders.css';
import Box from '../Box';
import boxStyles from '../Box.css';
import { useSideNavigation } from '../contexts/SideNavigationProvider';
import Divider from '../Divider';
import Flex from '../Flex';
import { type Props as SideNavigationProps } from '../SideNavigation';
import styles from '../SideNavigation.css';
import { flattenChildrenWithKeys } from '../utils/flattenChildren';
import { FixedZIndex } from '../zIndex';

type Props = { ...SideNavigationProps };
type Timeout = ReturnType<typeof setTimeout>;

export default function NavigationContent({
  accessibilityLabel,
  children,
  footer,
  header,
  showBorder,
  collapsible,
}: Props): ReactNode {
  const navigationChildren = flattenChildrenWithKeys(children);

  validateChildren({ children: navigationChildren, filterLevel: 'main' });

  const { collapsed, onCollapse, overlayPreview, setOverlayPreview } = useSideNavigation();
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<?Timeout>();

  useEffect(() => {
    const element = scrollContainer.current;
    const scrollHandler = () => setIsScrolled(!!element?.scrollTop);

    const mouseEnterHandler = () => {
      if (collapsed) {
        clearTimeout(timeoutRef.current);
        setOverlayPreview(true);
      }
    };

    const mouseLeaveHandler = () => {
      if (collapsed) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setOverlayPreview(false), 1000);
      }
    };

    element?.addEventListener('scroll', scrollHandler);
    element?.addEventListener('mouseenter', mouseEnterHandler);
    element?.addEventListener('mouseleave', mouseLeaveHandler);

    return () => {
      clearTimeout(timeoutRef.current);
      element?.removeEventListener('scroll', scrollHandler);
      element?.removeEventListener('mouseenter', mouseEnterHandler);
      element?.removeEventListener('mouseleave', mouseLeaveHandler);
    };
  }, [collapsed, onCollapse, setOverlayPreview]);

  const items =
    collapsed && !overlayPreview ? groupIconlessChildren(navigationChildren) : navigationChildren;
  const iconCount = countItemsWithIcon(navigationChildren);
  const shouldCollapseEmpty = iconCount === 0;
  const collapsedWidth = shouldCollapseEmpty ? 40 : 60;

  if (collapsible) {
    window.temp1 = navigationChildren;
    window.temp2 = items;
  }

  return (
    <Box
      height="100%"
      as="nav"
      aria-label={accessibilityLabel}
      color="default"
      position="relative"
      zIndex={new FixedZIndex(1)}
      width={collapsed ? collapsedWidth : 281}
    >
      <div
        ref={scrollContainer}
        className={classnames(styles.fullHeight, boxStyles.default, {
          [borderStyles.borderRight]: showBorder && !overlayPreview,
          [borderStyles.raisedBottom]: overlayPreview,
        })}
        style={{
          width: collapsed && !overlayPreview ? undefined : 280,
        }}
      >
        {collapsible && <Collapser raised={isScrolled} />}

        <Box
          display={collapsed && shouldCollapseEmpty ? 'none' : undefined}
          padding={2}
          dangerouslySetInlineStyle={{
            __style: {
              paddingBottom: 24,
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
