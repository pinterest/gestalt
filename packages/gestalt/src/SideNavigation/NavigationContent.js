// @flow strict
import { type Node as ReactNode, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import Collapser from './Collapser';
import {
  countItemsWithIcon,
  reduceIconlessChildrenIntoEllipsis,
  validateChildren,
} from './navigationChildrenUtils';
import borderStyles from '../Borders.css';
import Box from '../Box';
import boxStyles from '../Box.css';
import { useSideNavigation } from '../contexts/SideNavigationProvider';
import Divider from '../Divider';
import Flex from '../Flex';
import layoutStyles from '../Layout.css';
import { type Props as SideNavigationProps } from '../SideNavigation';
import styles from '../SideNavigation.css';
import { flattenChildrenWithKeys } from '../utils/flattenChildren';
import { FixedZIndex } from '../zIndex';

type Timeout = ReturnType<typeof setTimeout>;

export default function NavigationContent({
  accessibilityLabel,
  children,
  footer,
  header,
  showBorder,
}: SideNavigationProps): ReactNode {
  const navigationChildren = flattenChildrenWithKeys(children);

  validateChildren({ children: navigationChildren, filterLevel: 'main' });

  const {
    collapsible,
    collapsed: sideNavigationCollapsed,
    onCollapse,
    overlayPreview,
    setOverlayPreview,
    transitioning,
  } = useSideNavigation();

  const mainContainer = useRef<HTMLElement | null>(null);
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [collapsedContainerWidth, setCollapsedContainerWidth] = useState<number | void>();
  const previewTimeoutRef = useRef<?Timeout>();

  useEffect(() => {
    const element = scrollContainer.current;
    const scrollHandler = () => setIsScrolled(!!element?.scrollTop);

    const mouseEnterHandler = () => {
      if (sideNavigationCollapsed && !transitioning) {
        clearTimeout(previewTimeoutRef.current);
        setCollapsedContainerWidth(mainContainer.current?.offsetWidth);
        setOverlayPreview(true);
      }
    };

    const mouseLeaveHandler = () => {
      if (sideNavigationCollapsed) {
        clearTimeout(previewTimeoutRef.current);
        previewTimeoutRef.current = setTimeout(() => setOverlayPreview(false), 1000);
      }
    };

    element?.addEventListener('scroll', scrollHandler);
    element?.addEventListener('mouseenter', mouseEnterHandler);
    element?.addEventListener('mouseleave', mouseLeaveHandler);

    return () => {
      clearTimeout(previewTimeoutRef.current);
      element?.removeEventListener('scroll', scrollHandler);
      element?.removeEventListener('mouseenter', mouseEnterHandler);
      element?.removeEventListener('mouseleave', mouseLeaveHandler);
    };
  }, [sideNavigationCollapsed, onCollapse, setOverlayPreview, transitioning]);

  const isCollapsed = sideNavigationCollapsed && !overlayPreview;

  const items = isCollapsed
    ? reduceIconlessChildrenIntoEllipsis(navigationChildren)
    : navigationChildren;
  const iconCount = countItemsWithIcon(navigationChildren);

  const shouldCollapseEmpty = iconCount === 0;
  const shouldHideItems = sideNavigationCollapsed && shouldCollapseEmpty && !overlayPreview;

  const normalWidth = 280;
  const headerWidth = isCollapsed ? 44 : undefined;
  const collapsedWidth = shouldCollapseEmpty ? 40 : 60;
  const contentWidth = isCollapsed ? collapsedWidth : normalWidth;

  return (
    <Box
      ref={mainContainer}
      aria-label={accessibilityLabel}
      as="nav"
      color="default"
      height="100%"
      minWidth={collapsible ? undefined : normalWidth}
      position="relative"
      width={sideNavigationCollapsed ? collapsedContainerWidth : undefined}
      zIndex={overlayPreview ? new FixedZIndex(1) : undefined}
    >
      <div
        ref={scrollContainer}
        className={classnames(styles.fullHeight, layoutStyles.overflowAutoY, {
          [borderStyles.borderRight]: showBorder && !overlayPreview,
          [borderStyles.raisedBottom]: overlayPreview,
          [styles.contentWidthTransition]: collapsible,
          [boxStyles.default]: collapsible,
        })}
        style={{ width: collapsible ? 'max-content' : undefined }}
      >
        <div
          className={classnames({ [styles.contentWidthTransition]: collapsible })}
          style={{ width: collapsible ? contentWidth : undefined }}
        >
          {collapsible && <Collapser raised={isScrolled} />}

          <Box
            dangerouslySetInlineStyle={{
              __style: {
                paddingBottom: 24,
              },
            }}
            display={shouldHideItems ? 'none' : undefined}
            padding={2}
            width={collapsible ? contentWidth : undefined}
          >
            <Flex direction="column" gap={{ column: 4, row: 0 }}>
              {header ? (
                <Flex direction="column" gap={{ column: 4, row: 0 }}>
                  <Box width={headerWidth}>{header}</Box>
                  <Divider />
                </Flex>
              ) : null}

              <ul className={classnames(styles.ulItem)}>{items}</ul>

              {footer ? (
                <Flex direction="column" gap={{ column: 4, row: 0 }}>
                  <Divider />
                  <Box width={headerWidth}>{footer}</Box>
                </Flex>
              ) : null}
            </Flex>
          </Box>
        </div>
      </div>
    </Box>
  );
}
